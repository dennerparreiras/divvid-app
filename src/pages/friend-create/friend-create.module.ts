import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { FriendCreatePage } from './friend-create';

@NgModule({
  declarations: [
    FriendCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(FriendCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    FriendCreatePage
  ]
})
export class FriendCreatePageModule { }
