import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Bill } from '../../models/bill';

@IonicPage()
@Component({
  selector: 'page-bill-edit',
  templateUrl: 'bill-edit.html'
})
export class BillEditPage {
  isReadyToSave: boolean;

  currentBill: Bill;
  form: FormGroup;
  now: Date;

  constructor(public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder, public bill: Bill) {
    this.now = new Date();
    this.currentBill = bill;

    this.form = formBuilder.group({
      title: [this.currentBill["title"], Validators.required],
      description: [this.currentBill["description"]],
      todayToggle: [false],
      billDate: [this.currentBill["billDate"].toISOString()]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  public changeValues: boolean = true;

  public revealDate(form){
    this.changeValues = !this.changeValues;
    form.billDate = this.now.toISOString();
  }

  ionViewDidLoad() {
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
