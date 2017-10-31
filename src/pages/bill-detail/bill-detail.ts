import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, Platform, ModalController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController, 
    navParams: NavParams, 
    bills: Bills, 
    platform: Platform, 
    actionSheetCtrl: ActionSheetController, 
    modalCtrl: ModalController, 
    public alertCtrl: AlertController
  ) {

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
  deleteBill() {
    this.bills.delete(this.bill);
  }  

    /**
   * Open a menu to confirm to Delete an bill from the list of bills.
   */
  options(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'O que deseja fazer?',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Editar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.editBill();
          }
        },
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.confirmDelete('Confirmar exclusão', 'Deseja mesmo excluir este pedido?');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private confirmDelete(title, message) {
    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Sim',
          role: 'destructive',
          handler: () => {
            this.deleteBill();
            this.navCtrl.popToRoot();
          }
        },
        {
          text: 'Não',
          handler: () => {
            return;
          }
        }
      ]
    });
    alert.present();
  }
}