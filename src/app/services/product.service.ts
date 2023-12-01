import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(keyword: string='',page: number=1, size: number=3)  {
    return this.http.get(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`,
      {observe: 'response'});
  }

  public getProductById(id: number) : Observable<Product> {
    return this.http.get<Product>(`http://localhost:8089/products/${id}`);
  }

  public addProduct(product: Product) : Observable<Product> {
    return this.http.post<Product>('http://localhost:8089/products', product);
  }

  public checkProduct(product: Product) : Observable<Product> {
    return this.http.patch<any>(`http://localhost:8089/products/${product.id}`,
      {checked: !product.checked});
  }

  public deleteProduct(id: number){
    return this.http.delete<any>(`http://localhost:8089/products/${id}`);
  }

  public updateProduct(product: Product) : Observable<Product> {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`, product);
  }

}
