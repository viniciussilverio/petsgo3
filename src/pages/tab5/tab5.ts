import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import { PetsgoBackendProvider } from '../../providers/petsgo-backend/petsgo-backend';
import { Observable } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the Tab5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab5',
  templateUrl: 'tab5.html',
})
export class Tab5Page {


  // Propriedades

  _id: string;
  animal: number;
  sexo: number;
  porte: number;
  idade: number;
  foi: string;

  nome: string;
  nomeError: boolean;
  nomeErrorMessage: string;

  situacao: number;
  situacaoError: boolean;
  situacaoErrorMessage: string;

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

  results: Observable<any>;
  selected: any;
  isLoading: boolean;
  meusPets: boolean;
  mapa: boolean;
  firebase = firebase;
  local: any;
  alterar: any;

  @ViewChild('mySlider') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private PetsgoBackendProvider: PetsgoBackendProvider,
    private Geolocation: Geolocation,
    private camera: Camera,
    private platform: Platform,
    private socialSharing: SocialSharing) {
    this.selected = "";
    this.meusPets = false;
    this.mapa = false;
    this.alterar = false;
    this.animal = 0;
    this.sexo = 0;
    this.porte = 0;
    this.idade = 0;
    this.situacao = null;
    this.nome = "";
    this.foi = "";
    this.descricao = "";
    this._id = "";
    this.Geolocation.getCurrentPosition().then((res) => {
      let location = `${res.coords.latitude},${res.coords.longitude}`;
      this.local = location;

    }).catch((error) => {
      console.log('Error getting location', error);
    });;
  }

  ionViewWillEnter() {
    this.getMyPetsList()
  }

  verPets() {
    this.meusPets = true;
  }

  verMapa() {
    this.mapa = true;
  }

  cleanMapa() {
    this.mapa = false;
  }

  cleanPerfil() {
    this.meusPets = false;
  }

  SignOut() {
    firebase.auth().signOut();
  }

  // Fix bellow
  getMyPetsList() {
    this.isLoading = true;
    this.results = this.PetsgoBackendProvider.getMyPetsList(firebase.auth().currentUser.uid);
    this.results.subscribe(_ => {
      this.isLoading = false
    });
  }

  refreshPetList(refresher) {
    this.results = this.PetsgoBackendProvider.getMyPetsList(firebase.auth().currentUser.uid);
    this.results.subscribe(_ => {
      refresher.complete();
    });
  }

  cleanPet() {
    this.selected = "";
  }

  cleanAlterar() {
    this.alterar = false;
    this.slides.slideTo(0);
    this.resetData();
    this.resetValidations();
  }

  selectPet(pet, event) {
    if (event.target.className != "imgframe favorited") {
      this.selected = pet;
    }
  }

  getImgUrl(item) {
    return (item.fotos[0]);
    /* return(`${environment.backend}/getImage/${item._id}/${Object.keys(item._attachments)[0]}`) */
  }

  editarPet() {
    this.alterar = true;
    this._id = `${this.selected._id}`;
    this.nome = `${this.selected.nome}`;
    this.descricao = `${this.selected.descricao}`;
    this.animal = this.selected.especie === "Canina" ? 0 : 1;
    this.situacao = this.selected.situacao === "Adoção" ? 0 : 1;
    this.sexo = this.selected.genero === "Masculino" ? 0 : 1;
    this.porte = this.selected.porte === "Pequeno" ? 0 : this.selected.porte === "Médio" ? 1 : 2;
    this.idade = this.selected.idade === "Filhote" ? 0 : this.selected.porte === "Adulto" ? 1 : 2;
    let arrayTemp = [];
    if (this.selected.castrado === "Sim") arrayTemp.push("0");
    if (this.selected.vacinado === "Sim") arrayTemp.push("1");
    if (this.selected.vermifugado === "Sim") arrayTemp.push("2");
    this.foi = arrayTemp.join(",");
    for (let x = 0; x < this.selected.fotos.length; x++) {
      this.convertToDataURLviaCanvas(this.selected.fotos[x], "image/jpeg").then(foto => this["img" + x] = foto);
    }
  }

  calculateDistance(petLocal) {
    try {
      let lat1 = this.local.split(",")[0];
      let long1 = this.local.split(",")[1];
      let lat2 = petLocal.split(",")[0];
      let long2 = petLocal.split(",")[1];
      let p = 0.017453292519943295;    // Math.PI / 180
      let c = Math.cos;
      let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
      let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
      return (Math.round(dis));
    } catch (error) {
      console.log("Erro calculando distancia");
      return (0);
    }
  }

  /* Funções para validar depois */


  resetData() {
    this.animal = 0;
    this.sexo = 0;
    this.porte = 0;
    this.idade = 0;
    this.situacao = null;
    this.nome = "";
    this.foi = "";
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
    this.localError = null;
    this.localErrorMessage = null;
  }

  containsOnlyText(input) {

    const onlyText = /^[A-Za-z ]+$/;

    if (input == "") {
      return true;
    }

    if (input.match(onlyText)) {
      return true;
    } else {
      return false;
    }
  }

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(false);
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

    if (!this.localError && !this.situacaoError) {
      this.updatePet()
    }
  }

  async updatePet() {
    await this.PetsgoBackendProvider.updatePet(this._id, this.nome, this.descricao,
      this.animal, this.situacao, this.sexo, this.porte, this.idade,
      this.foi.indexOf("0") > -1 ? "1" : "0", this.foi.indexOf("1") > -1 ? "1" : "0",
      this.foi.indexOf("2") > -1 ? "1" : "0", this.local, firebase.auth().currentUser.uid,
      firebase.auth().currentUser.displayName, firebase.auth().currentUser.photoURL,
      this.img0, this.img1, this.img2, this.img3);
    this.alterar = false;
    this.selected = false;
    this.slides.slideTo(0);
    this.resetData();
    this.resetValidations();
    let self = this;
    setTimeout(function () { self.getMyPetsList(); }, 1000)
  }

  async deletePet() {
    await this.PetsgoBackendProvider.deletePet(this.selected._id, firebase.auth().currentUser.uid);
    this.selected = false;
    let self = this;
    setTimeout(function () { self.getMyPetsList(); }, 1000)
  }

  fileChange(event, imgNumber) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this["img" + imgNumber] = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  cleanIMG(imgNumber) {
    let doc: any = document.getElementById("fileupload" + imgNumber);
    doc.value = "";
    this["img" + imgNumber] = null;
  }

  takePicture(imgNumber) {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this["img" + imgNumber] = 'data:image/jpeg;base64,' + imageData;
    }).catch(error => console.warn(error))
  }

  convertToDataURLviaCanvas(url, outputFormat) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        resolve(dataURL);
        canvas = null;
      };
      img.src = url + '?' + Math.random() + "" + Math.random();
    });
  }

  async compartilhar() {
    let foto = await this.convertToDataURLviaCanvas(this.selected.fotos[0], "image/jpeg");
    this.socialSharing.share(`${this.selected.nome} esta disponível para adoção.\nEncontre este e outros Pets no PetsGo!`, `Ajude a salvar uma vida.`, `${foto}`, 'https://petsgo0.webnode.com/').then(() => {
      console.log("Done");
    }).catch(() => {
      console.log("Erro");
    });
  }
}
