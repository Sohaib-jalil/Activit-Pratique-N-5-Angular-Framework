import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  constructor(private productsService: ProductService, private router:Router, public appState : AppStateService) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts() {
    // this.products$ = this.productsService.getProducts();
    this.productsService.getProducts(
      this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize).subscribe({
      next: (resp) => {
        let products = resp.body as Array<Product>;
        let totalProducts = parseInt(resp.headers.get('X-Total-Count')!);
        let totalPages = Math.ceil(totalProducts / this.appState.productsState.pageSize);
        this.appState.setProductState({
          products : products,
          totalProducts : totalProducts,
          totalPages : totalPages,
          status :"LOADED"
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  handleCheckProduct(product:Product) {
    this.productsService.checkProduct(product).subscribe({
      next: () => {
        this.searchProducts()
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
          //this.getProducts();
          //this.appState.productsState.products=
          //this.appState.productsState.products.filter((p:any)=>p.id!=product.id);
          this.searchProducts();
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }

  handleGoTOPage(page: number) {
    this.appState.productsState.currentPage = page;
    this.searchProducts();
  }

  handleEditProduct(product: Product) {
    this.router.navigate(['/admin/editProduct', product.id])
  }
}
