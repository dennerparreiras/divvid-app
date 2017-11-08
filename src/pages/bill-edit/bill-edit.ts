import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    viewCtrl: ViewController, 
    formBuilder: FormBuilder, 
    bills: Bills,
    private statusBar: StatusBar 
  ) {

    this.bill = navParams.get('bill') || bills.defaultBill;
    this.viewCtrl = viewCtrl;
    this.getInfoToFormGroup(this.bill).then((group)=>{
      this.form = formBuilder.group(group);
      this.form.value.billDate = this.findDate(this.form.value.billDate);
    })
    .then(()=>{
      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
    })

  }

  findDate(date:string): string{
    return new Date(date).toISOString();
  }

  ionViewWillLoad() {
    // this.statusBar.backgroundColorByHexString('#613dff');
  }

  private getInfoToFormGroup(bill): Promise<any>{
    return new Promise((resolve,reject) => {
      resolve({
        title: [bill.title, Validators.required],
        description: [bill.description],
        todayToggle: [false],
        billDate: [bill.billDate, Validators.required]
      });
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
