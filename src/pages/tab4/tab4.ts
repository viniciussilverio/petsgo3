import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { PetsgoBackendProvider } from '../../providers/petsgo-backend/petsgo-backend';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the Tab4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab4',
  templateUrl: 'tab4.html',
})
export class Tab4Page {


  @ViewChild('tabelaDeMsgs') tabelaDeMsgs: any;
  results: any;
  chat: any;
  isLoading: boolean;
  firebase = firebase;
  selected: string;
  timer: any;
  chatTimer: any;
  timeTorun: any;
  mensagem: string;
  detalhes: any;
  local: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private PetsgoBackendProvider: PetsgoBackendProvider, public events: Events, private Geolocation: Geolocation) {
    this.Geolocation.getCurrentPosition().then((res) => {
      let location = `${res.coords.latitude},${res.coords.longitude}`;
      this.local = location;
    }).catch((error) => {
      console.log('Error getting location', error);
    });;
  }

  ionViewWillEnter() {
    this.getChatsList();
    this.updateChatsList();
  }

  ngOnInit() {
    this.events.subscribe('openChat', (chat) => {
      this.selectChat(chat);
    });
  }

  getChatsList() {
    this.isLoading = true;
    let pegador = this.PetsgoBackendProvider.getChatsList(firebase.auth().currentUser.uid);
    pegador.subscribe(data => {
      this.isLoading = false;
      this.results = data;
      this.results.sort(function (a, b) { return +b.lastMsg - +a.lastMsg });
    });
  }

  resfreshChatsList(refresher) {
    let pegador = this.PetsgoBackendProvider.getChatsList(firebase.auth().currentUser.uid);
    pegador.subscribe(data => {
      this.results = data;
      this.results.sort(function (a, b) { return +b.lastMsg - +a.lastMsg });
      refresher.complete();
    });
  }

  updateChatsList() {
    let pegador = this.PetsgoBackendProvider.getChatsList(firebase.auth().currentUser.uid);
    pegador.subscribe(data => {
      this.results = data;
      this.results.sort(function (a, b) { return +b.lastMsg - +a.lastMsg });
      let self = this;
      this.chatTimer = setTimeout(function () { self.updateChatsList(); /* console.log("Atualizando")  */ }, 5000);
    });
  }

  selectChat(selected) {
    clearInterval(this.timer);
    this.timer = null;
    this.chat = null;
    this.selected = selected;
    this.isLoading = true;
    this.timeTorun = Date.now();
    let pegador = this.PetsgoBackendProvider.getMessageList(firebase.auth().currentUser.uid, selected);
    pegador.subscribe(data => {
      this.isLoading = false;
      this.chat = data;
      let self = this;
      this.timer = setTimeout(function () { self.updateChat(`${selected}`, `${self.timeTorun}`); /* console.log("Atualizando")  */ }, 5000);
      this.scrollToBottom();
    });
  }

  updateChat(selected, timeTorun) {
    if (this.selected === selected && this.timeTorun == timeTorun) {
      let pegador = this.PetsgoBackendProvider.getMessageList(firebase.auth().currentUser.uid, this.selected);
      pegador.subscribe(data => {
        if (this.selected === selected && this.timeTorun == timeTorun) {
          this.isLoading = false;
          let self = this;
          this.timer = setTimeout(function () { self.updateChat(`${selected}`, `${timeTorun}`); /* console.log("Atualizando")  */ }, 5000);
          if (this.chat.msgs.length !== data["msgs"].length) {
            this.chat = data;
            console.log("Dado atualizado")
            this.scrollToBottom();
          }
        }
      });
    }
  }

  clearSelected() {
    clearInterval(this.timer);
    this.timer = null;
    this.isLoading = false;
    this.selected = null;
    this.chat = null;
  }

  addMessage() {
    if (this.mensagem) {
      let pegador = this.PetsgoBackendProvider.addMessage(firebase.auth().currentUser.uid, this.selected, `${this.mensagem}`);
      this.mensagem = "";
      pegador.subscribe(data => {
        this.chat = data;
        this.scrollToBottom();
      });
    }
  }

  scrollToBottom() {
    const self = this;
    setTimeout(function () { self.tabelaDeMsgs.scrollToBottom(100); }, 200);
  }

  convertDate(dateValue) {
    let otherDay = new Date(dateValue * 1000);
    let today = new Date();
    const todayDate = this.checkZero(today.getDate() + "") + "/" + this.checkZero((today.getMonth() + 1) + "") + "/" + this.checkZero(otherDay.getFullYear() + "");
    let day = otherDay.getDate() + "";
    let month = (otherDay.getMonth() + 1) + "";
    let year = otherDay.getFullYear() + "";
    let hour = otherDay.getHours() + "";
    let minutes = otherDay.getMinutes() + "";
    let seconds = otherDay.getSeconds() + "";

    day = this.checkZero(day);
    month = this.checkZero(month);
    year = this.checkZero(year);
    hour = this.checkZero(hour);
    minutes = this.checkZero(minutes);
    seconds = this.checkZero(seconds);
    const otherDayDate = day + "/" + month + "/" + year;

    if (todayDate == otherDayDate) {
      return (hour + ":" + minutes + ":" + seconds);
    } else {
      return (day + "/" + month + "/" + year);
    }
  }


  checkZero(data) {
    if (data.length == 1) {
      data = "0" + data;
    }
    return data;
  }

  calculateDistance(petLocal) {
    try {
      let lat1 = this.local.split(",")[0];
      let long1 = this.local.split(",")[1];
      let lat2 = petLocal.split(",")[0];
      let long2 = petLocal.split(",")[1];
      let p = 0.017453292519943295;    // Math.PI / 180
      let c = Math.cos;
      let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
      let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
      return (Math.round(dis));
    } catch (error) {
      console.log("Error")
      return (0)
    }
  }

  openDetalhes() {
    this.detalhes = this.chat.pet;
  }

  closeDetalhes() {
    this.detalhes = null;
  }
}
