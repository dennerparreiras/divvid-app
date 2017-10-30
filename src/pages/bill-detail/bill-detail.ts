import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController, ViewController } from 'ionic-angular';

import { Bills } from '../../providers/providers';
import { BillEditPage } from '../bill-edit/bill-edit';

@IonicPage()
@Component({
  selector: 'page-bill-detail',
  templateUrl: 'bill-detail.html'
})
export class BillDetailPage {
  bill: any;
  bills: any;
  actionsheetCtrl: any;
  platform: any;
  modalCrtl: ModalController;

  constructor(public navCtrl: NavController, navParams: NavParams, bills: Bills, platform: Platform, actionSheetCtrl: ActionSheetController, modalCtrl: ModalController) {
    this.bill = navParams.get('bill') || bills.defaultBill;
    this.bills = bills;
    this.actionsheetCtrl = actionSheetCtrl;
    this.platform = platform;
    this.modalCrtl = modalCtrl;
  }

  editBill() {
    let myModal = this.modalCrtl.create(BillEditPage, {bill: this.bill});
    myModal.present();
  }

  /**
   * Delete the bill.
   */
  deleteBill(bill) {
    this.bills.delete(bill);
  }  

  /**
 * Open a menu to confirm to Delete an bill from the list of bills.
 */
  delete(bill) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Você tem certeza que quer excluir este pedido?',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.deleteBill(bill);
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    actionSheet.present();
  }
}