import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { Bill } from '../../models/bill';
import { Bills } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentBills: Bill[];

  constructor(
    public navCtrl: NavController, 
    public bills: Bills, 
    public modalCtrl: ModalController,
    private statusBar: StatusBar ) {

    this.refreshBills();

  }

  public refreshBills(){
    this.bills.getList().then((data)=>{
      this.currentBills = data;
      console.log('Refresh bills:');
      console.log(this.currentBills);
    })
  }

  /**
   * The view loaded, let's query our bills for the list
   */
  ionViewWillEnter() {
    // this.statusBar.backgroundColorByHexString('#6d008a');
    this.refreshBills();
  }

  /**
   * Prompt the user to add a new bill. This shows our BillCreatePage in a
   * modal and then adds the new bill to our data source if the user created one.
   */
  addBill() {
    let addModal = this.modalCtrl.create('BillCreatePage');
    addModal.onDidDismiss(bill => {
      if (bill) {
        this.bills.insert(bill);
        this.refreshBills();
      }
    })
    addModal.present();
  }

  /**
   * Delete an bill from the list of bills.
   */
  deleteBill(bill) {
    this.bills.delete(bill)
    .then(()=>{
      console.log('bill deleted');
      this.refreshBills();
    })
  }

  /**
   * Navigate to the detail page for this bill.
   */
  openBill(bill: Bill) {
    this.navCtrl.push('BillDetailPage', {
      bill: bill
    }
  ).then(()=>{
      console.log('bill deleted');
      this.refreshBills();
    })
  }
}
