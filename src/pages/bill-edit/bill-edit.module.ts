import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillEditPage } from './bill-edit';

@NgModule({
  declarations: [
    BillEditPage,
  ],
  imports: [
    IonicPageModule.forChild(BillEditPage),
  ],
})
export class BillEditPageModule {}
