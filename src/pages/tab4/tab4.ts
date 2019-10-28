import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { PetsgoBackendProvider } from '../../providers/petsgo-backend/petsgo-backend';
import firebase from 'firebase/app';
import 'firebase/auth';

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
  timeTorun: any;
  mensagem: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private PetsgoBackendProvider: PetsgoBackendProvider, public events: Events) {
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
    });
  }

  updateChatsList() {
    let pegador = this.PetsgoBackendProvider.getChatsList(firebase.auth().currentUser.uid);
    pegador.subscribe(data => {
      this.results = data;
      let self = this;
      this.timer = setTimeout(function () { self.updateChatsList(); /* console.log("Atualizando")  */ }, 5000);
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
      console.log("Chat Selecionado")
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
          if (this.chat.msgs.length !== data.msgs.length) {
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
}
