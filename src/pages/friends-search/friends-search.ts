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

  searchKeys: string = "";
  currentFriends: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public friends: Friends, 
    public modalCtrl: ModalController,
    private statusBar: StatusBar 
  ) {}

  ionViewWillEnter() {
    // this.statusBar.backgroundColorByHexString('#6d008a');
    this.friends.getList().then((friendsList) => {
      this.currentFriends = friendsList;
      this.getFriends();
      console.log('Seleção de amigos 1: ');
      console.log(this.currentFriends);
    });
  }
  
  /**
   * Perform a service for the proper friends.
   */
  public getFriends() {
    this.currentFriends = this.friends.query( this.searchKeys );
  }

  /**
   * Navigate to the detail page for this friend.
   */
  private openFriend(friend: Friend) {
    this.navCtrl.push('FriendDetailPage', {
      friend: friend
    });
  }

  private addFriend() {
    this.navCtrl.push('FriendCreatePage', {});
  }

}
