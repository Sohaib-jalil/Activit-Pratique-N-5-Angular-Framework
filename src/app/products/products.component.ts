import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products! : Array<Product>;
  keyword: any = '';
  totalPages: number=0;
  pageSize: number=3;
  currentPage: number=1;

  constructor(private productsService: ProductService, private router:Router) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts() {
    // this.products$ = this.productsService.getProducts();
    this.productsService.getProducts(this.keyword,this.currentPage, this.pageSize).subscribe({
      next: (resp) => {
        this.products = resp.body as Array<Product>;
        let totalProducts = parseInt(resp.headers.get('X-Total-Count')!);
        this.totalPages = Math.ceil(totalProducts / this.pageSize);
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
          // this.getProducts()
          this.products = this.products.filter(p => p.id !== product.id)
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }

  handleGoTOPage(page: number) {
    this.currentPage = page;
    this.searchProducts();
  }

  handleEditProduct(product: Product) {
    this.router.navigate(['/editProduct', product.id])
  }
}
