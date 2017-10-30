import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { FriendSearchPage } from './friends-search';

@NgModule({
  declarations: [
    FriendSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendSearchPage),
    TranslateModule.forChild()
  ],
  exports: [
    FriendSearchPage
  ]
})
export class SearchPageModule { }
