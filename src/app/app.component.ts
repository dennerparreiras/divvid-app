import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { DatabaseProvider } from '../providers/database/database';

// <ion-menu [content]="content">
// <ion-header>
//   <ion-toolbar>
//     <ion-title>Pages</ion-title>
//   </ion-toolbar>
// </ion-header>

// <ion-content>
//   <ion-list>
//     <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
//       {{p.title}}
//     </button>
//   </ion-list>
// </ion-content>

// </ion-menu>

@Component({
  template: `
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class Divvid {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Aprendendo', component: 'TutorialPage'     }
    // { title: 'Login',      component: 'WelcomePage'      },
    // { title: 'Pedidos',    component: 'HomePage'         },
    // { title: 'Amigos',     component: 'FriendSearchPage' }
  ]

  constructor(
    private translate: TranslateService, 
    platform: Platform, 
    settings: Settings, 
    private config: Config, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private databaseprovider: DatabaseProvider 
  ) {
    platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#6d008a');

      this.databaseprovider.fillDatabase();

      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('pt-br');

    // if (this.translate.getBrowserLang() !== undefined) {
    //   this.translate.use(this.translate.getBrowserLang());
    // } else {
      this.translate.use('pt-br'); // Set your language here
    // }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
