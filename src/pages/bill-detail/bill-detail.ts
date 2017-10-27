import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Bills } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-bill-detail',
  templateUrl: 'bill-detail.html'
})
export class BillDetailPage {
  bill: any;

  constructor(public navCtrl: NavController, navParams: NavParams, bills: Bills) {
    this.bill = navParams.get('bill') || bills.defaultBill;
  }

}
