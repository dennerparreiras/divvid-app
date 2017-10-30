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
    this.form = formBuilder.group(this.getInfoToFormGroup(this.bill));
    console.log(this.form);
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  getInfoToFormGroup(bill){
    return {
      title: [bill.title, Validators.required],
      description: [bill.description],
      todayToggle: [false],
      billDate: [new Date(bill.billDate).toISOString(), Validators.required]
    }
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
      this.bill.billDate = Date.parse(this.form.value.billDate);
      console.log('billDate done()');
      console.log(this.bill.billDate);
    }
    this.viewCtrl.dismiss(this.form.value);
  }
}
