import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BillCreatePage } from './bill-create';

@NgModule({
  declarations: [
    BillCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(BillCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    BillCreatePage
  ]
})
export class BillCreatePageModule { }
