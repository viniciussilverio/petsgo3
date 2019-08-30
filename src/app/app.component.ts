import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('rootNav') rootNav;
  rootPage:any;
  firstRun: boolean = true;

  constructor(private platform: Platform, private statusBar: StatusBar,
              private splashScreen: SplashScreen) {

    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyAYiZdtD0EqL8QfmCPPQ6ibyrcGOlwTBps",
      authDomain: "petsgo-1d56a.firebaseapp.com",
      databaseURL: "https://petsgo-1d56a.firebaseio.com",
      projectId: "petsgo-1d56a",
      storageBucket: "petsgo-1d56a.appspot.com",
      messagingSenderId: "393027674647"
    };
    firebase.initializeApp(config);
  }

  ngAfterViewInit() {

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        // User is authenticated.
        this.setRootPage(HomePage);
      } else {
        // User is not authenticated.
        this.setRootPage(LoginPage);
      }
    });
  }

  setRootPage(page) {
    console.log(page)
    if (this.firstRun) {

      // if its the first run we also have to hide the splash screen
      this.rootNav.setRoot(page)
        .then(() => this.platform.ready())
        .then(() => {

          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          this.statusBar.styleDefault();
          this.splashScreen.hide();
          this.firstRun = false;
        });
    } else {
      this.rootNav.setRoot(page);
    }
  }
}

