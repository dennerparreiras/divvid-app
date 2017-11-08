import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { Friend } from '../../models/friend';
import { Friends } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-friend-search',
  templateUrl: 'friends-search.html'
})
export class FriendSearchPage {

  searchKeys: string = '';
  currentFriends: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public friends: Friends, 
    public modalCtrl: ModalController,
    private statusBar: StatusBar 
  ) {

    this.currentFriends = friends.query('');

  }

  ionViewWillEnter() {
    // this.statusBar.backgroundColorByHexString('#6d008a');
  }

  /**
   * Perform a service for the proper friends.
   */
  getFriends() {
    this.currentFriends = this.friends.query({
      name: this.searchKeys
    });
  }

  /**
   * Navigate to the detail page for this friend.
   */
  openFriend(friend: Friend) {
    this.navCtrl.push('FriendDetailPage', {
      friend: friend
    }).then(() => {
      this.getFriends();
    });
  }

  addFriend() {
    let addModal = this.modalCtrl.create('FriendCreatePage');
    addModal.onDidDismiss(friend => {
      if (friend) {
        this.friends.add(friend);
        this.getFriends();
      }
    })
    addModal.present();
  }

}
