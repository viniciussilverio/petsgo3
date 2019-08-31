import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the Tab3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html',
})
export class Tab3Page {
  animal: number;
  sexo: number;
  img0: any;
  img1: any;
  img2: any;
  img3: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.animal = 0;
    this.sexo = 0;
  }

  @ViewChild('mySlider') slides: Slides;

  ionViewDidLoad() {
  }



  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }

  dog() {
    this.animal = 0;
  }

  cat() {
    this.animal = 1;
  }

  menino() {
    this.sexo = 0;
  }

  menina() {
    this.sexo = 1;
  }

  done() {
    console.log("Sending");
  }

  fileChange(event, imgNumber) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this["img" + imgNumber] = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    /* console.log(file); */
  }

  cleanIMG(imgNumber) {
    let doc: any = document.getElementById("fileupload" + imgNumber);
    doc.value = "";
    this["img" + imgNumber] = "";
  }

}