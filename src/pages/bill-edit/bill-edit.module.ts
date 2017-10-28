import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BillEditPage } from './bill-edit';

@NgModule({
  declarations: [
    BillEditPage,
  ],
  imports: [
    IonicPageModule.forChild(BillEditPage),
    TranslateModule.forChild()
  ],
  exports: [
    BillEditPage
  ]
})
export class BillEditPageModule { }
