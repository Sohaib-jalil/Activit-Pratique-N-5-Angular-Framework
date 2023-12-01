import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId!: number;
  product!: Product
  productFormGroup!: FormGroup;

  constructor(private route:ActivatedRoute, private productService: ProductService,
              private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.params['id']);
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        console.log(product)
        this.productFormGroup = this.fb.group({
          id: this.fb.control(product.id),
          name: this.fb.control(product.name, [Validators.required]),
          price: this.fb.control(product.price , [Validators.min(100)]),
          checked: this.fb.control(product.checked)
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateProduct() {
    this.productService.updateProduct(this.productFormGroup.value).subscribe({
      next: (data) => {
        alert(JSON.stringify(data))
        console.log(data)
        this.router.navigate(['/products'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
