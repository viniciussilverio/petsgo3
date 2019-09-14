import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  nomeError: boolean;
  nomeErrorMessage: string;

  situacao: number;
  porte: number;
  idade: number;
  foi: string;
  local: string;

  descricao: string;
  descricaoError: boolean;
  descricaoErrorMessage: string;

  img0: any;
  img1: any;
  img2: any;
  img3: any;
  photoError: boolean;
  photoErrorMessage: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private PetsgoBackendProvider: PetsgoBackendProvider,
              public alertControler: AlertController) {
      this.animal = 0;
      this.sexo = 0;
      this.porte = 0;
      this.idade = 0;
      this.situacao = null;
      this.nome = "";
      this.foi = "";
      this.local = "";
      this.descricao = "";
  }

  resetData() {
    this.animal = 0;
    this.sexo = 0;
    this.porte = 0;
    this.idade = 0;
    this.situacao = null;
    this.nome = "";
    this.foi = "";
    this.local = "";
    this.descricao = "";
    this.cleanIMG(0);
    this.cleanIMG(1);
    this.cleanIMG(2);
    this.cleanIMG(3);
  }

  resetValidations() {
    this.descricaoError = null;
    this.descricaoErrorMessage = null;
    this.nomeError = null;
    this.nomeErrorMessage = null;
    this.photoError = null;
    this.photoErrorMessage = null;
  }

  isValidText(input) {
    const onlyText = /^[A-Za-z]+$/;
 
    if (input == "") {
     return true;
    }
 
    if(input.match(onlyText)) {
       return true;
     } else {
       return false;
     }
   }

  @ViewChild('mySlider') slides: Slides;

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
  }

  next() {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
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

  validatePetData() {

    const requiredText: string = "Ops! Precisamos dessa informação."

    if (this.descricao != "") {
      this.descricaoError = false;
      this.descricaoErrorMessage = null;
    } else {
      this.descricaoError = true;
      this.descricaoErrorMessage = requiredText;
    }

    if (!this.isValidText(this.nome)) {
      this.nomeError = true;
      this.nomeErrorMessage = "Ops! O nome deve conter apenas letras";
    } else if (this.nome != "") {
      this.nomeError = false;
      this.nomeErrorMessage = null;
    }  else {
      this.nomeError = true;
      this.nomeErrorMessage = requiredText;
    }

    if (!this.descricaoError && !this.nomeError) {
      this.next();
    }
  }

  validatePetPhotos() {
    
    if (this.img0 != null || this.img1 != null || this.img2 != null || this.img3 != null) {
      this.photoError = false;
      this.photoErrorMessage = null;
      this.next()
    } else {
      this.photoError = true;
      this.photoErrorMessage = "Ops! Precisamos de pelo menos uma foto.";
    }
  }

  validateGeneralInformationData() {
    
    if (this.local != "" && this.situacao != null && this.foi != "") {
      this.addPet()
    } else {
      let alert = this.alertControler.create({
        title: 'Ops!',
        subTitle: 'Preencha todos os campos! :D',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  async addPet() {
    await this.PetsgoBackendProvider.addPet(this.nome, this.descricao,
      this.animal, this.situacao, this.sexo, this.porte, this.idade,
      this.foi.indexOf("0") > -1 ? "1" : "0", this.foi.indexOf("1") > -1 ? "1" : "0",
      this.foi.indexOf("2") > -1 ? "1" : "0", this.local, "vinicius.silverio",
      this.img0, this.img1, this.img2, this.img3);
    this.slides.slideTo(0);
    this.resetData();
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
    this["img" + imgNumber] = null;
  }

}