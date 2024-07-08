import { Iproduct } from './../models/iproduct';
import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BASE_URL } from '../tokens/tokens/app-tokens.token';


@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends ApiService<Iproduct>{

  // baseUrl:string = "https://localhost:7237/api/product"
  constructor(http:HttpClient,@Inject(BASE_URL) baseUrl :string) {

    super(http,"https://localhost:7237/api/product")
}

 
  getVisibleProduct():Observable<Iproduct[]>{

    return this.http.get<Iproduct[]>(`${this.baseUrl}/visible`)
  }

}
