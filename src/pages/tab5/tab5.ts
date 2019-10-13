import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import { PetsgoBackendProvider } from '../../providers/petsgo-backend/petsgo-backend';
import { Observable } from 'rxjs';

/**
 * Generated class for the Tab5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab5',
  templateUrl: 'tab5.html',
})
export class Tab5Page {

  results: Observable<any>;
  selected: any;
  isLoading: boolean;
  meusPets: boolean;
  firebase = firebase;

  constructor(public navCtrl: NavController, public navParams: NavParams, private PetsgoBackendProvider: PetsgoBackendProvider) {
    this.selected = "";
    this.meusPets = false;
  }

  ionViewWillEnter() {
    this.getMyPetsList()
  }

  verPets() {
    this.meusPets = true;
  }

  cleanPerfil() {
    this.meusPets = false;
  }

  SignOut() {
    firebase.auth().signOut();
  }

  // Fix bellow
  getMyPetsList() {
    this.isLoading = true;
    this.results = this.PetsgoBackendProvider.getMyPetsList(firebase.auth().currentUser.uid);
    this.results.subscribe( _ => {
      this.isLoading = false
    });
  }

  refreshPetList(refresher) {
    this.results = this.PetsgoBackendProvider.getMyPetsList(firebase.auth().currentUser.uid);
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

  editarPet() {
    console.log("Editando Pet");
  }

}
