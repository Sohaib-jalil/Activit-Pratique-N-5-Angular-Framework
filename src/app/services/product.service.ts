import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(page: number=1, size: number=4) : Observable<Array<Product>> {
    return this.http.get<Array<any>>(`http://localhost:8089/products?_page=${page}&_limit=${size}`);
  }

  public addProduct(product: Product) : Observable<Product> {
    return this.http.post<any>('http://localhost:8089/products', product);
  }

  public checkProduct(product: Product) : Observable<Product> {
    return this.http.patch<any>(`http://localhost:8089/products/${product.id}`,
      {checked: !product.checked});
  }

  public deleteProduct(id: number){
    return this.http.delete<any>(`http://localhost:8089/products/${id}`);
  }

  public updateProduct(product: Product) : Observable<Product> {
    return this.http.patch<any>(`http://localhost:8089/products/${product.id}`, product);
  }

  searchProducts(keyword: any) : Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}`);
  }
}
