// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'epitech-serverless',
    appId: '1:711705843792:web:2692726515f46e06cbd955',
    storageBucket: 'epitech-serverless.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyAJOqxGKXYqJcJMEPAsUuVJx3BMEWW-73k',
    authDomain: 'epitech-serverless.firebaseapp.com',
    messagingSenderId: '711705843792',
    vapidKey: 'AAAApbT5WFA:APA91bFJN1H3iWFu0lYGrZaix-odDkdDhbZ63cq8YvEWYh7A4qTEoJ3G2FN3-A1rrHS_yK-oCDKT-G3iiR2-8LczgVaNVpqw6raiKYVnM4EuhQxyifo1Ycauu_6kmeg75Ux6gw1WqUxV',
  },
  production: false,
  apiUrl: 'https://europe-west1-epitech-serverless.cloudfunctions.net/webApiEu/v1/',
  authRequired: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
