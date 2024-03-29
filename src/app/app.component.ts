import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import firebase from 'firebase/app';
import { environment } from '../environments/environment';
import 'firebase/auth';
import { PetsgoBackendProvider } from '../providers/petsgo-backend/petsgo-backend';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('rootNav') rootNav;
  rootPage:any;
  firstRun: boolean = true;

  constructor(private platform: Platform, private statusBar: StatusBar,
              private splashScreen: SplashScreen, private PetsgoBackendProvider: PetsgoBackendProvider) {

    // Initialize Firebase
    const config = environment.firebase;
    firebase.initializeApp(config);
  }

  ngAfterViewInit() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.PetsgoBackendProvider.updateUser(user.displayName, user.email, user.photoURL, user.uid);
        this.setRootPage(HomePage);
      } else {
        // User is not authenticated.
        this.setRootPage(LoginPage);
      }
    });
  }

  setRootPage(page) {
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

