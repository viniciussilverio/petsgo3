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

  getPetsList() {
    return this.http.get(`${this.url}/findPets`); 
  }
}
