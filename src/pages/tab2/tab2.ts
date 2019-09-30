import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PetsgoBackendProvider } from '../../providers/petsgo-backend/petsgo-backend';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {

  results: Observable<any>;
  selected: any;
  isLoading: boolean;
  firebase = firebase;

  constructor(public navCtrl: NavController, public navParams: NavParams, private PetsgoBackendProvider: PetsgoBackendProvider) {
    this.selected = "";
  }

  ionViewWillEnter() {
    this.getPetFavorites()
  }

  getPetFavorites() {
    this.isLoading = true;
    this.results = this.PetsgoBackendProvider.getPetFavorites(firebase.auth().currentUser.uid);
    this.results.subscribe( _ => {
      this.isLoading = false
    });
  }

  setFavorite(pet) {
    this.PetsgoBackendProvider.setPetFavorites(firebase.auth().currentUser.uid, pet).subscribe(_ => {
      this.getPetFavorites();
      this.selected = "";
    });
  }

  refreshPetList(refresher) {
    this.results = this.PetsgoBackendProvider.getPetFavorites(firebase.auth().currentUser.uid);
    this.results.subscribe( _ => {
      refresher.complete();
    });
  }

  cleanPet() {
    this.selected = "";
  }

  selectPet(pet, event) {
    if(event.target.className != "imgframe favorited") {
      this.selected = pet;
    }
  }

  getImgUrl(item) {
    return (item.fotos[0]);
    /* return(`${environment.backend}/getImage/${item._id}/${Object.keys(item._attachments)[0]}`) */
  }

}