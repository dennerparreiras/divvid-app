import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Friends } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-friend-create',
  templateUrl: 'friend-create.html'
})
export class FriendCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  friend: any;

  form: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    formBuilder: FormBuilder,
    public friends: Friends, 
    // public camera: Camera,
    private statusBar: StatusBar 
  ) {

    this.form = formBuilder.group({
      // PicturePath: [''],
      // profilePic: [''],
      Name: ['', Validators.required],
      About: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ionViewWillLoad() {
    // this.statusBar.backgroundColorByHexString('#761ddb');
  }

  getPicture() {
    // if (Camera['installed']()) {
    //   this.camera.getPicture({
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     targetWidth: 96,
    //     targetHeight: 96
    //   }).then((data) => {
    //     this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
    //   }, (err) => {
    //     alert('Unable to take photo');
    //   })
    // } else {
    //   this.fileInput.nativeElement.click();
    // }
  }

  processWebImage(event) {
    // let reader = new FileReader();
    // reader.onload = (readerEvent) => {

    //   let imageData = (readerEvent.target as any).result;
    //   this.form.patchValue({ 'profilePic': imageData });
    // };

    // reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    // return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the friend, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.navCtrl.pop()
      .then(() => {
        this.friends.insert(this.form.value);
      });
  }
}
