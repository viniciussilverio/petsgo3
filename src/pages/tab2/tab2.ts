import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PetsgoBackendProvider } from '../../providers/petsgo-backend/petsgo-backend';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {

  results: Observable<any>;
  selected: any;
  isLoading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private PetsgoBackendProvider: PetsgoBackendProvider) {
    this.selected = "";
  }

  ionViewWillEnter() {
    this.getPetFavorites()
  }

  getPetFavorites() {
    this.isLoading = true;
    this.results = this.PetsgoBackendProvider.getPetsList();
    this.results.subscribe( _ => {
      this.isLoading = false
    });
  }

  cleanPet() {
    this.selected = "";
  }

  selectPet(pet) {
    this.selected = pet;
  }

  getImgUrl(item) {
    return (item.fotos[0]);
    /* return(`${environment.backend}/getImage/${item._id}/${Object.keys(item._attachments)[0]}`) */
  }

}