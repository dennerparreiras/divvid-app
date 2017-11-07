import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Bills } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-bill-edit',
  templateUrl: 'bill-edit.html',
})
export class BillEditPage {
  bill: any;
  viewCtrl: ViewController;
  isReadyToSave: boolean;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, viewCtrl: ViewController, formBuilder: FormBuilder, bills: Bills) {
    this.bill = navParams.get('bill') || bills.defaultBill;
    this.viewCtrl = viewCtrl;
    this.getInfoToFormGroup(this.bill).then((group)=>{
      this.form = formBuilder.group(group);
    })
    .then(()=>{
      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
    })
  }

  private getInfoToFormGroup(bill): Promise<any>{
    return new Promise((resolve,reject) => {
      let aux =
        {
          title: [bill.title, Validators.required],
          description: [bill.description],
          todayToggle: [false],
          billDate: [new Date(bill.billDate)/*.toISOString()*/, Validators.required]
        }
      resolve(aux);
    })
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { 
      return; 
    }
    else{
      this.bill.title = this.form.value.title;
      this.bill.description = this.form.value.description;
      this.bill.todayToggle = false;
      this.bill.billDate = /*Date.parse(*/this.form.value.billDate/*)*/;
      console.log('billDate done()');
      console.log(this.bill.billDate);
    }
    this.viewCtrl.dismiss(this.form.value);
  }
}
