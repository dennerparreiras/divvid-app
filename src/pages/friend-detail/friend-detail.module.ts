import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { FriendDetailPage } from './friend-detail';

@NgModule({
  declarations: [
    FriendDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    FriendDetailPage
  ]
})
export class FriendDetailPageModule { }
