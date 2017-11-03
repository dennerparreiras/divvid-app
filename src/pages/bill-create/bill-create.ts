import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bill-create',
  templateUrl: 'bill-create.html'
})
export class BillCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  bill: any;
  form: FormGroup;
  now: Date;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera) {
    this.now = new Date();
    this.form = formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      todayToggle: [true],
      billDate: [this.now.getFullYear() + '-' +this.now.getMonth() + '-' +this.now.getDay()]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  public changeValues: boolean = false;

  public revealDate(form){
    this.changeValues = !this.changeValues;
    form.billDate = this.now.toISOString();
  }

  ionViewDidLoad() {

  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the bill, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    console.log('Date on the constructor:');
    console.log(this.form.value.billDate);
    this.viewCtrl.dismiss(this.form.value);
  }
}
