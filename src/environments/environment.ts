// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAYiZdtD0EqL8QfmCPPQ6ibyrcGOlwTBps",
    authDomain: "petsgo-1d56a.firebaseapp.com",
    databaseURL: "https://petsgo-1d56a.firebaseio.com",
    projectId: "petsgo-1d56a",
    storageBucket: "petsgo-1d56a.appspot.com",
    messagingSenderId: "393027674647"
  },
  backend: "https://petsgo.herokuapp.com"
  /* backend: "https://petsgobackendapp.mybluemix.net" */
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
