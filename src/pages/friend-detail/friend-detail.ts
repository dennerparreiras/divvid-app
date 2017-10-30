import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Friends } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-friend-detail',
  templateUrl: 'friend-detail.html'
})
export class FriendDetailPage {
  friend: any;

  constructor(public navCtrl: NavController, navParams: NavParams, friends: Friends) {
    this.friend = navParams.get('friend') || friends.defaultFriend;
  }

}
