import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform  } from 'ionic-angular';

import { Bills } from '../../providers/providers';

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

  constructor(
    public navCtrl: NavController, navParams: NavParams, bills: Bills, platform: Platform, actionSheetCtrl: ActionSheetController) {
    this.bill = navParams.get('bill') || bills.defaultBill;
    this.bills = bills;
    this.actionsheetCtrl = actionSheetCtrl;
    this.platform = platform;
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
  openMenu(bill) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Você tem certeza que quer deletar?',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Deletar',
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
