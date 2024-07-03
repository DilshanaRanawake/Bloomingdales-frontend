import { Component, OnInit } from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:Product;

  constructor(private cartService:CartService,private productService:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
const theProductId:number =+this.route.snapshot.paramMap.get('id')!;
  this.productService.getProduct(theProductId).subscribe(
    data=>{
      this.product=data;
    }
  )
  }

  addToCart(product: Product) {
    const theCartItem = new CartItem(product);
    this.cartService.addToCart(theCartItem);
  }
}
