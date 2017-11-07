import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { Bills } from '../mocks/providers/bills';
import { Friends } from '../mocks/providers/friends';
import { Places } from '../mocks/providers/places';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { Divvid } from './app.component';

import { BillEditPage } from '../pages/bill-edit/bill-edit';

import { IonicStorageModule, Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { DatabaseProvider } from '../providers/database/database';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite /*, SQLiteObject*/  } from '@ionic-native/sqlite';

import { BillDAO } from '../DAO/DAO-bill';
import { FriendDAO } from '../DAO/DAO-friend';
import { ProductDAO } from '../DAO/DAO-product';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Denner Parreiras',
    option3: '3',
    option4: 'Teste'
  });
}

@NgModule({
  declarations: [
    Divvid,
    BillEditPage
  ],
  imports: [
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(Divvid
      // ,{
      // monthNames: ['Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Novembro', 'Dezembro' ],
      // monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Nov', 'Dez' ],
      // dayNames: ['Domingo', 'Segunda-feira', 'Ter\u00e7a-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira' ],
      // dayShortNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex' ]
      // }
    ),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Divvid,
    BillEditPage
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    Places,
    Bills,
    Friends,
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DatabaseProvider
   
  ]
})
export class AppModule { }
