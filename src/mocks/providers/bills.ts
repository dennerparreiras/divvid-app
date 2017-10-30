import { Injectable } from '@angular/core';

import { Bill } from '../../models/bill';

@Injectable()
export class Bills {
  bills: Bill[] = [];

  defaultBill: any = {
    "title": "Saída de sábado (Exemplo)",
    "description": "Barzinho com os amigos.",
    "billDate" : new Date().toISOString()
  };


  constructor() {
    let bills = [
      {
        "title": "A Granel",
        "description": "Aniversário do Rhaylander.",
        "billDate" : new Date('2017-10-26').toISOString()
      },
      {
        "title": "Churras do Arthur",
        "description": "Festa com a galera da faculdade.",
        "billDate" : new Date('2017-10-21').toISOString()
      },
      {
        "title": "Pizza de Sexta",
        "description": "Reunião de familia.",
        "billDate" : new Date('2017-10-27').toISOString()
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
