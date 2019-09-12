import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { PetsgoBackendProvider } from '../../providers/petsgo-backend/petsgo-backend';

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
  nome: string;
  situacao: number;
  porte: number;
  idade: number;
  foi: string;
  local: string;
  descricao: string;
  img0: any;
  img1: any;
  img2: any;
  img3: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private PetsgoBackendProvider: PetsgoBackendProvider) {
    this.animal = 0;
    this.sexo = 0;
    this.nome = "";
    this.situacao = 0;
    this.porte = 0;
    this.idade = 0;
    this.foi = "";
    this.local = "";
    this.descricao = "";
  }

  clearAll() {
    this.animal = 0;
    this.sexo = 0;
    this.nome = "";
    this.situacao = 0;
    this.porte = 0;
    this.idade = 0;
    this.foi = "";
    this.local = "";
    this.descricao = "";
    this.cleanIMG(0);
    this.cleanIMG(1);
    this.cleanIMG(2);
    this.cleanIMG(3);
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

  async done() {
    await this.PetsgoBackendProvider.addPet(this.nome, this.descricao,
      this.animal, this.situacao, this.sexo, this.porte, this.idade,
      this.foi.indexOf("0") > -1 ? "1" : "0", this.foi.indexOf("1") > -1 ? "1" : "0",
      this.foi.indexOf("2") > -1 ? "1" : "0", this.local, "vinicius.silverio",
      this.img0, this.img1, this.img2, this.img3);
    this.slides.slideTo(0);
    this.clearAll();
  }

  fileChange(event, imgNumber) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this["img" + imgNumber] = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    /* let fileList: FileList = event.target.files; */
    /* let file: File = fileList[0]; */
    /* console.log(file); */
  }

  cleanIMG(imgNumber) {
    let doc: any = document.getElementById("fileupload" + imgNumber);
    doc.value = "";
    this["img" + imgNumber] = "";
  }

}