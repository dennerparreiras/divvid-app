import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public friends: Friends) {
    this.currentFriends = friends.query('');
  }

  /**
   * Perform a service for the proper friends.
   */
  getFriends() {
    console.log(' >>>>>>> ');
    console.log(this.searchKeys);
    if(this.searchKeys == ''){
      let newFriends = new Friends();
      this.currentFriends = newFriends.query('');
      return;
    }
    else {
      this.currentFriends = this.friends.query({
        name: this.searchKeys
      });
    }
  }

  /**
   * Navigate to the detail page for this friend.
   */
  openFriend(friend: Friend) {
    this.navCtrl.push('FriendDetailPage', {
      friend: friend
    });
  }

}
