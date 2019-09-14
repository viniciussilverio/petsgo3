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

  // Properties

  animal: number;
  sexo: number;
  porte: number;
  idade: number;

  nome: string;
  nomeError: boolean;
  nomeErrorMessage: string;

  situacao: number;
  situacaoError: boolean;
  situacaoErrorMessage: string;

  foi: string;
  foiError: boolean;
  foiErrorMessage: string;

  local: string;
  localError: boolean;
  localErrorMessage: string;

  descricao: string;
  descricaoError: boolean;
  descricaoErrorMessage: string;

  img0: any;
  img1: any;
  img2: any;
  img3: any;
  photoError: boolean;
  photoErrorMessage: string;

  // Init

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private PetsgoBackendProvider: PetsgoBackendProvider) {
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

  // Methods

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
    this.situacaoError = null;
    this.situacaoErrorMessage = null;
    this.foiError = null;
    this.foiErrorMessage = null;
    this.localError = null;
    this.localErrorMessage = null;
  }

  containsOnlyText(input) {

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

    if (this.descricao == "") {
      this.descricaoError = true;
      this.descricaoErrorMessage = requiredText;
    } else {
      this.descricaoError = false;
      this.descricaoErrorMessage = null;
    }

    if (!this.containsOnlyText(this.nome)) {
      this.nomeError = true;
      this.nomeErrorMessage = "Ops! O nome deve conter apenas letras";
    } else if (this.nome != "") {
      this.nomeError = false;
      this.nomeErrorMessage = null;
    } else {
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

    const requiredText: string = "Ops! Precisamos dessa informação.";

    if (this.local == "") {
      this.localError = true;
      this.localErrorMessage = requiredText;
    } else {
      this.localError = false;
      this.localErrorMessage = null;
    }
    
    if (this.situacao == null) {
      this.situacaoError = true;
      this.situacaoErrorMessage = requiredText;
    } else {
      this.situacaoError = false;
      this.situacaoErrorMessage = null;
    }

    if (this.foi == "") {
      this.foiError = true;
      this.foiErrorMessage = requiredText;
    } else {
      this.foiError = false;
      this.foiErrorMessage = null;
    }

    if (!this.localError && !this.situacaoError && !this.foiError) {
      this.addPet()
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
    this.resetValidations();
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