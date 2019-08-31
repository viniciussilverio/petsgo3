import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PetsgoBackendProvider } from '../../providers/petsgo-backend/petsgo-backend';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {

  results: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private PetsgoBackendProvider: PetsgoBackendProvider) {
    this.getPetsList();
  }

  ionViewDidLoad() {
    
  }


  getPetsList() {
    this.results = this.PetsgoBackendProvider.getPetsList();
  }

  getImgUrl(item) {
    return(`${environment.backend}/getImage/${item._id}/${Object.keys(item._attachments)[0]}`)
  }

}


