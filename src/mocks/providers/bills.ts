import { Injectable } from '@angular/core';

import { Bill } from '../../models/bill';

@Injectable()
export class Bills {
  bills: Bill[] = [];

  defaultBill: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let bills = [
      {
        "name": "Burt Bear",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Charlie Cheetah",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "Charlie is a Cheetah."
      }
    ];

    for (let bill of bills) {
      this.bills.push(new Bill(bill));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.bills;
    }

    return this.bills.filter((bill) => {
      for (let key in params) {
        let field = bill[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return bill;
        } else if (field == params[key]) {
          return bill;
        }
      }
      return null;
    });
  }

  add(bill: Bill) {
    this.bills.push(bill);
  }

  delete(bill: Bill) {
    this.bills.splice(this.bills.indexOf(bill), 1);
  }
}
