import { Injectable } from '@angular/core';

import { Bill } from '../../models/bill';
import { BillDAO } from '../../DAO/DAO-bill';
import { DatabaseProvider } from '../../providers/database/database';

@Injectable()
export class Bills {
  bills: Bill[] = [];
  dao: BillDAO;

  defaultBill: any = {
    "title": "Saída de sábado (Exemplo)",
    "description": "Barzinho com os amigos.",
    "billDate" : new Date().toISOString()
  };


  constructor(private dataBaseProv: DatabaseProvider) {
    this.dao = new BillDAO(dataBaseProv);
  }

  public getList(): Promise<any[]>{
    return new Promise((resolve,reject) => {
      this.dao.getList().then((billsFound) => {
        this.bills = [];
        for (let bill of billsFound) {
          this.bills.push(new Bill(bill));
        }
        resolve(this.bills);
      })
   })
  }

  query(params?: any) {
    console.log('bills.ts query');
    this.getList();

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

  insert(bill: Bill): any{
    this.dao.insert(bill);
  }

  delete(bill: Bill) {
    //this.bills.splice(this.bills.indexOf(bill), 1);
    return new Promise((resolve,reject) => {
      this.dao.delete(bill).then((data) => {
        resolve(data);
      })
   }).catch(()=>{
     return false;
   })
  }
}
