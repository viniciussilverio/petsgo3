import { Component } from '@angular/core';
import { NavController, Platform, Events } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Tab1Page } from '../tab1/tab1';
import { Tab2Page } from '../tab2/tab2';
import { Tab3Page } from '../tab3/tab3';
import { Tab4Page } from '../tab4/tab4';
import { Tab5Page } from '../tab5/tab5';
import { AdMob } from "ionic-admob";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private admob: AdMob, private platform: Platform, public events: Events) {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        /* admob.banner.show({ id: "test" }); */
        admob.setDevMode(true);
        admob.banner.show({
          id: {
            android: 'ca-app-pub-9924908105255416/2420774279',
            ios: 'ca-app-pub-9924908105255416/6795133555',
          }
        });
        setTimeout(function () {
          admob.banner.hide('ca-app-pub-9924908105255416/2420774279');}, 10000);
      });
    }
  }

  logout() {
    firebase.auth().signOut();
  }

  enableMessages (value) {
    let self = this;
    setTimeout(function () {self.events.publish('startChat', value)}, 100);
  }

  tab1Root = Tab1Page;
  tab2Root = Tab2Page;
  tab3Root = Tab3Page;
  tab4Root = Tab4Page;
  tab5Root = Tab5Page;

}
