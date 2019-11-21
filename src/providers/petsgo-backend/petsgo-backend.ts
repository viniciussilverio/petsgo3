import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/*
  Generated class for the PetsgoBackendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PetsgoBackendProvider {

  url = environment.backend;
  constructor(public http: HttpClient) { }

  getPetsList(user) {
    return this.http.get(`${this.url}/findPets/${user}`);
  }

  getMyPetsList(user) {
    return this.http.get(`${this.url}/findMyPets/${user}`);
  }

  getPetFavorites(user) {
    return this.http.get(`${this.url}/getFavoritos/${user}`);
  }

  setPetFavorites(user, pet) {
    return this.http.get(`${this.url}/setFavoritos/${user}/${pet}`);
  }

  addPet(nome, descricao, especie, situacao, genero, porte, idade,
    castrado, vacinado, vermifugado, local, cuidador,
    nomeCuidador, fotoCuidador, file1, file2, file3, file4) {

    let httpOptions = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        'x-key': "esoPs03943"
      }
    };

    let formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('especie', especie);
    formData.append('situacao', situacao);
    formData.append('genero', genero);
    formData.append('porte', porte);
    formData.append('idade', idade);
    formData.append('castrado', castrado);
    formData.append('vacinado', vacinado);
    formData.append('vermifugado', vermifugado);
    formData.append('local', local);
    formData.append('cuidador', cuidador);
    formData.append('nomeCuidador', nomeCuidador);
    formData.append('fotoCuidador', fotoCuidador);

    file1 ? formData.append('foto1', file1) : false;
    file2 ? formData.append('foto2', file2) : false;
    file3 ? formData.append('foto3', file3) : false;
    file4 ? formData.append('foto4', file4) : false;

    this.http.post(
      `${this.url}/addPet`,
      formData,
      httpOptions
    )
    .subscribe(
    data => {
      /* console.log(data); */
    },
    err => {
      console.log("ERROR!: ", err);
    }
    );
  }

  updatePet(_id, nome, descricao, especie, situacao, genero, porte, idade,
    castrado, vacinado, vermifugado, local, cuidador,
    nomeCuidador, fotoCuidador, file1, file2, file3, file4) {

    let httpOptions = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        'x-key': "esoPs03943"
      }
    };

    let formData = new FormData();
    formData.append('_id', _id);
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('especie', especie);
    formData.append('situacao', situacao);
    formData.append('genero', genero);
    formData.append('porte', porte);
    formData.append('idade', idade);
    formData.append('castrado', castrado);
    formData.append('vacinado', vacinado);
    formData.append('vermifugado', vermifugado);
    formData.append('local', local);
    formData.append('cuidador', cuidador);
    formData.append('nomeCuidador', nomeCuidador);
    formData.append('fotoCuidador', fotoCuidador);

    file1 ? formData.append('foto1', file1) : false;
    file2 ? formData.append('foto2', file2) : false;
    file3 ? formData.append('foto3', file3) : false;
    file4 ? formData.append('foto4', file4) : false;

    this.http.post(
      `${this.url}/updatePet`,
      formData,
      httpOptions
    )
    .subscribe(
    data => {
      /* console.log(data); */
    },
    err => {
      console.log("ERROR!: ", err);
    }
    );
  }

  deletePet(_id, cuidador) {

    let httpOptions = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        'x-key': "esoPs03943"
      }
    };

    let formData = new FormData();
    formData.append('_id', _id);
    formData.append('cuidador', cuidador);

    this.http.post(
      `${this.url}/deletePet`,
      formData,
      httpOptions
    )
    .subscribe(
    data => {
      /* console.log(data); */
    },
    err => {
      console.log("ERROR!: ", err);
    }
    );
  }

  updateUser(nome, email, foto, userId) {

    let httpOptions = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        'x-key': "esoPs03943"
      }
    };

    let formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('foto', foto);
    formData.append('userId', userId);

    this.http.post(
      `${this.url}/updateUser`,
      formData,
      httpOptions
    )
    .subscribe(
    data => {
      /* console.log(data); */
    },
    err => {
      console.log("ERROR!: ", err);
    }
    );
  }

  getChatsList(userId) {

    let httpOptions = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        'x-key': "esoPs03943"
      }
    };

    let formData = new FormData();
    formData.append('userId', userId);

    return this.http.post(
      `${this.url}/getChatsList`,
      formData,
      httpOptions
    );
  }

  getMessageList(userId, chatId) {

    let httpOptions = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        'x-key': "esoPs03943"
      }
    };

    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('chatId', chatId);

    return this.http.post(
      `${this.url}/getMessageList`,
      formData,
      httpOptions
    );
  }

  addMessage(userId, chatId, msg) {

    let httpOptions = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        'x-key': "esoPs03943"
      }
    };

    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('chatId', chatId);
    formData.append('msg', msg);

    return this.http.post(
      `${this.url}/addMessage`,
      formData,
      httpOptions
    );
  }

  requestAdoption(userId, petId) {
    console.log(userId, petId);
    let httpOptions = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        'x-key': "esoPs03943"
      }
    };

    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('petId', petId);

    return this.http.post(
      `${this.url}/requestAdoption`,
      formData,
      httpOptions
    );
  }

  acceptAdoption(userId, petId) {

    let httpOptions = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        'x-key': "esoPs03943"
      }
    };

    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('petId', petId);

    return this.http.post(
      `${this.url}/acceptAdoption`,
      formData,
      httpOptions
    );
  }

  cancelAdoption(userId, petId) {

    let httpOptions = {
      headers: {
        'enctype': 'multipart/form-data;',
        'Accept': 'plain/text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Headers': 'Authorization, Origin, Content-Type, X-CSRF-Token',
        'x-key': "esoPs03943"
      }
    };

    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('petId', petId);

    return this.http.post(
      `${this.url}/cancelAdoption`,
      formData,
      httpOptions
    );
  }
}
