import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { PetsgoBackendProvider } from '../../providers/petsgo-backend/petsgo-backend';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {

  results: Observable<any>;
  filtered: any;
  selected: any;
  isLoading: boolean;
  filtrar: boolean;
  card: boolean;
  firebase = firebase;
  local: any;
  filtro = {
    especie: null,
    genero: null,
    situacao: null,
    porte: null,
    idade: null,
    distancia: 80
  }
  filtroAplicado = {
    especie: null,
    genero: null,
    situacao: null,
    porte: null,
    idade: null,
    distancia: 80
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private PetsgoBackendProvider: PetsgoBackendProvider, private Geolocation: Geolocation) {
    this.selected = false;
    this.filtrar = false;
    this.card = true;
    this.Geolocation.getCurrentPosition().then((res) => {
      let location = `${res.coords.latitude},${res.coords.longitude}`;
      this.local = location;
    }).catch((error) => {
      console.log('Error getting location', error);
    });;
  }

  ionViewWillEnter() {
    this.getPetsList();
  }

  getPetsList() {
    this.isLoading = true;
    this.results = this.PetsgoBackendProvider.getPetsList(firebase.auth().currentUser.uid);
    this.results.subscribe(data => {
      this.filtered = this.filtraDado(data);
      this.isLoading = false;
    });
  }

  refreshPetList(refresher) {
    this.results = this.PetsgoBackendProvider.getPetsList(firebase.auth().currentUser.uid);
    this.results.subscribe(data => {
      this.filtered = this.filtraDado(data);
      refresher.complete();
    });
  }

  setFavorite(pet) {
    this.PetsgoBackendProvider.setPetFavorites(firebase.auth().currentUser.uid, pet).subscribe(_ => {
      this.getPetsList();
      this.selected = false;
      this.card = true;
      this.filtrar = false;
    });
  }

  fecharPet() {
    this.selected = false;
    this.card = true;
    this.filtrar = false;
  }

  selectPet(pet, event) {
    if (event.target.className != "imgframe unfavorited") {
      this.selected = pet;
      this.card = false;
      this.filtrar = false;
    }
  }

  getImgUrl(item) {
    return (item.fotos[0]);
    /* return(`${environment.backend}/getImage/${item._id}/${Object.keys(item._attachments)[0]}`) */
  }

  goChat(petId) {
    this.navCtrl.parent.select(3);
    let self = this;
    setTimeout(function () {self.events.publish('openChat', `${firebase.auth().currentUser.uid}-${petId}`)}, 100);
    this.filtrar = false;
    this.selected = false;
    this.card = true;
  }

  fecharFiltro() {
    this.selected = false;
    this.filtrar = false;
    this.card = true;
    this.filtro = JSON.parse(JSON.stringify(this.filtroAplicado));
  }

  abrirFiltro() {
    this.filtrar = true;
    this.selected = false;
    this.card = false;
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

  filtraDado(data) {
    let filtered = data.filter(x =>
      (this.filtroAplicado.especie ? this.filtroAplicado.especie == x.especie : true) &&
      (this.filtroAplicado.genero ? this.filtroAplicado.genero == x.genero : true) &&
      (this.filtroAplicado.idade ? this.filtroAplicado.idade == x.idade : true) &&
      (this.filtroAplicado.porte ? this.filtroAplicado.porte == x.porte : true) &&
      (this.filtroAplicado.situacao ? this.filtroAplicado.situacao == x.situacao : true) &&
      (this.calculateDistance(x.local) < this.filtroAplicado.distancia)
    );
    return filtered;
  }

  aplicarFiltro() {
    this.filtroAplicado = JSON.parse(JSON.stringify(this.filtro));
    this.fecharFiltro();
    this.getPetsList();
  }

  limparFiltro(item) {
    if (item === "distancia") {
      this.filtro[item] = 80;
    } else {
      this.filtro[item] = null;
    }
  }

}