import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/product';

@Injectable({
    providedIn: 'root'
  })
  export class DataService {
  
    apiUrl = 'https://localhost:7174/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }
  
    constructor(private httpClient: HttpClient) { 
    }
  
    /* C - Create */
  
    AddProduct(product:Product)
    {
      return this.httpClient.post(this.apiUrl+ `Product/AddProduct`, product);
    }
  
    /* R - All*/
    GetProducts() {
      return this.httpClient.get(this.apiUrl + `Product/GetAllProducts`);
    }
  
    /* R - One*/
    GetProduct(ProductId:Number) {
    return this.httpClient.get(this.apiUrl + `Product/GetProduct/${ProductId}`);
    }
  
    /* U - Update*/
    UpdateProduct(ProductId:Number,product:Product) {
      return this.httpClient.put(this.apiUrl + `Product/UpdateProduct/${ProductId}`, product);
    }
  
  
    /* D - Delete*/
    DeleteProduct(ProductId:Number) {
      return this.httpClient.delete(this.apiUrl + `Product/DeleteProduct/${ProductId}`);
    }
  
  
  }
  