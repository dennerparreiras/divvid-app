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
    let val = this.searchKeys || '';
    if (!val || !val.trim()) {
      this.currentFriends = this.friends;
      return;
    }
    if(val == ''){
      console.log('IF >> ');
      console.log(val);
      let newFriends = new Friends();
      this.currentFriends = newFriends.query('');
      return;
    }
    else {
      console.log('ELSE >> ');
      console.log(val);
      this.currentFriends = this.friends.query({
        name: val
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
