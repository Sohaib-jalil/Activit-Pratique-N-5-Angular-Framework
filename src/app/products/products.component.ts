import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products! : Array<Product>;
  keyword: any;

  constructor(private productsService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    // this.products$ = this.productsService.getProducts();
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  handleCheckProduct(product:Product) {
    this.productsService.checkProduct(product).subscribe({
      next: () => {
        this.getProducts()
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  handleDeleteProduct(product: Product) {
    if (confirm('Are you sure?')) {
      this.productsService.deleteProduct(product.id).subscribe({
        next: () => {
          // this.getProducts()
          this.products = this.products.filter(p => p.id !== product.id)
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }

  searchProducts() {
    this.productsService.searchProducts(this.keyword).subscribe({
      next: (products) => {
        this.products = products
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
