import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Bill } from '../../models/bill';
import { Bills } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentBills: Bill[];

  constructor(public navCtrl: NavController, public bills: Bills, public modalCtrl: ModalController) {
    this.currentBills = this.bills.query();
  }

  /**
   * The view loaded, let's query our bills for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new bill. This shows our BillCreatePage in a
   * modal and then adds the new bill to our data source if the user created one.
   */
  addBill() {
    let addModal = this.modalCtrl.create('BillCreatePage');
    addModal.onDidDismiss(bill => {
      if (bill) {
        this.bills.add(bill);
      }
    })
    addModal.present();
  }

  /**
   * Delete an bill from the list of bills.
   */
  deleteBill(bill) {
    this.bills.delete(bill);
  }

  /**
   * Navigate to the detail page for this bill.
   */
  openBill(bill: Bill) {
    this.navCtrl.push('BillDetailPage', {
      bill: bill
    });
  }
}
