import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BillDetailPage } from './bill-detail';

@NgModule({
  declarations: [
    BillDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BillDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    BillDetailPage
  ],
  entryComponents: [
    BillDetailPage
  ]
})
export class BillDetailPageModule { }
