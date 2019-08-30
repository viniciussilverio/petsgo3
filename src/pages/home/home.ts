import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Tab1Page } from '../tab1/tab1';
import { Tab2Page } from '../tab2/tab2';
import { Tab3Page } from '../tab3/tab3';
import { Tab4Page } from '../tab4/tab4';
import { Tab5Page } from '../tab5/tab5';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  logout() {
    firebase.auth().signOut();
  }

  tab1Root = Tab1Page;
  tab2Root = Tab2Page;
  tab3Root = Tab3Page;
  tab4Root = Tab4Page;
  tab5Root = Tab5Page;

}
