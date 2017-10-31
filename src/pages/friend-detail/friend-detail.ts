import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, Platform } from 'ionic-angular';

import { Friends } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-friend-detail',
  templateUrl: 'friend-detail.html'
})
export class FriendDetailPage {
  friend: any;
  friends: Friends;
  actionsheetCtrl: any;
  platform: any;

  constructor(public navCtrl: NavController, navParams: NavParams, platform: Platform, friends: Friends, actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    this.friend = navParams.get('friend') || friends.defaultFriend;
    this.actionsheetCtrl = actionSheetCtrl;
    this.platform = platform;
    this.friends = friends;
  }

  options(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'O que deseja fazer?',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Editar',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.editFriend();
            this.navCtrl.popToRoot();
          }
        },
        {
          text: 'Excluir',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.confirmDelete('Confirmar exclusão', 'Deseja mesmo excluir este amigo?');
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
            this.deleteFriend();
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

  editFriend(){
    console.log('edit');
  }

  deleteFriend(){
    this.friends.delete(this.friend);
  }

}
