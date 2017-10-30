import { Injectable } from '@angular/core';

import { Friend } from '../../models/friend';

@Injectable()
export class Friends {
  friends: Friend[] = [];

  defaultFriend: any = {
    "name": "Denner Parreiras",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Criador do Divvid.",
  };


  constructor() {
    let friends = [
      {
        "name": "Denner Parreiras",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Criador do Divvid.",
      },
      {
        "name": "Arthur Fonseca",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Miojo."
      },
      {
        "name": "Arthur Vinicius",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "Tutuzinhogameplays2k17"
      },
      {
        "name": "Braulley Junio",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Caceta de nome.",
      },
      {
        "name": "Wagner Santos",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Wagão.",
      }
    ];

    for (let friend of friends) {
      this.friends.push(new Friend(friend));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.friends;
    }

    return this.friends.filter((friend) => {
      for (let key in params) {
        let field = friend[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return friend;
        } else if (field == params[key]) {
          return friend;
        }
      }
      return null;
    });
  }

  add(friend: Friend) {
    this.friends.push(friend);
  }

  delete(friend: Friend) {
    this.friends.splice(this.friends.indexOf(friend), 1);
  }
}
