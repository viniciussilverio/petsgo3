import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PetsgoBackendProvider } from '../../providers/petsgo-backend/petsgo-backend';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {

  results: Observable<any>;
  selected: any;
  isLoading: boolean;
  firebase = firebase;

  constructor(public navCtrl: NavController, public navParams: NavParams, private PetsgoBackendProvider: PetsgoBackendProvider) {
    this.selected = "";
  }

  ionViewWillEnter() {
    this.getPetsList();
  }

  getPetsList() {
    this.isLoading = true;
    this.results = this.PetsgoBackendProvider.getPetsList(firebase.auth().currentUser.uid);
    this.results.subscribe(_ => {
      this.isLoading = false;
    });
  }

  refreshPetList(refresher) {
    this.results = this.PetsgoBackendProvider.getPetsList(firebase.auth().currentUser.uid);
    this.results.subscribe(_ => {
      refresher.complete();
    });
  }

  setFavorite(pet) {
    this.PetsgoBackendProvider.setPetFavorites(firebase.auth().currentUser.uid, pet).subscribe(_ => {
      this.getPetsList();
      this.selected = "";
    });
  }

  cleanPet() {
    this.selected = "";
  }

  selectPet(pet, event) {
    if(event.target.className != "imgframe unfavorited") {
      this.selected = pet;
    }
  }

  getImgUrl(item) {
    return (item.fotos[0]);
    /* return(`${environment.backend}/getImage/${item._id}/${Object.keys(item._attachments)[0]}`) */
  }

}


