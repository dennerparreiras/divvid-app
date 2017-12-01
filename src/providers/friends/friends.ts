import { Injectable } from '@angular/core';

import { Friend } from '../../models/friend';
import { FriendDAO } from '../../DAO/DAO-friend';
import { DatabaseProvider } from '../../providers/database/database';

@Injectable()
export class Friends {
  friends: Friend[] = [];
  dao: FriendDAO;

  constructor(private dataBaseProv: DatabaseProvider) {
    this.dao = new FriendDAO(dataBaseProv);
  }

  public getList(): Promise<any[]>{
    return new Promise((resolve,reject) => {
      this.dao.getList().then((friendsFound) => {
        this.friends = [];
        for (let friend of friendsFound) {
          this.friends.push(new Friend(friend));
        }
        resolve(this.friends);
      })
   })
  }

  query(filterValue:string = "") {
    if (filterValue == "") {
      return this.friends;
    }

    return this.friends.filter((friend:any) => {
      if (friend.Name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0 || friend.About.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0) {
        return friend;
      } else if (friend.Name.toLowerCase() == filterValue.toLowerCase() || friend.About.toLowerCase() == filterValue.toLowerCase()) {
        return friend;
      }
      return null;
    });
  }

  insert(friend: Friend){
    return new Promise((resolve,reject) => {
      this.dao.insert(friend);
    });
  }

  delete(friend: Friend) {
    return new Promise((resolve,reject) => {
      this.dao.delete(friend);
    });
  }
}
