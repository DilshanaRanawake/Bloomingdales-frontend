import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ProductCategory} from "../../common/product-category";
import {AddProductModel} from "../../common/AddProduct.model";
import {MatOptionSelectionChange} from "@angular/material/core";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm:FormGroup;
  productCategories:ProductCategory[];

  productId:number;

  constructor(private productService:ProductService,private route:Router) { }

  ngOnInit(): void {
    this.productService.getProductCategories().subscribe(data=>{
      this.productCategories=data;
    })
    this.productForm=new FormGroup({
        id:new FormControl(null,{validators:[Validators.required]}),
        categoryName:new FormControl(null,{validators:[Validators.required]}),
        name:new FormControl(null,{validators:[Validators.required]}),
        description:new FormControl(null,{validators:[Validators.required]}),
        unit_price:new FormControl(null,{validators:[Validators.required]}),
        image_url:new FormControl(null,{validators:[Validators.required]}),
        units_in_stock:new FormControl(null,{validators:[Validators.required]}),
    })

  }


  onSaveProduct() {
    const dto:any= {
      "category":{"id":this.productId,"categoryName":this.productForm.get('categoryName')?.value},
      "name":this.productForm.get('name')?.value,
      "description":this.productForm.get('description')?.value,
      "unit_price":this.productForm.get('unit_price')?.value,
      "image_url":this.productForm.get('image_url')?.value,
      "active":true,
      "units_in_stock":this.productForm.get('units_in_stock')?.value
    }
    this.productService.addProduct(dto).subscribe(()=>{
      this.route.navigate(['/'])
      this.productForm.reset();
    })

  }

  onSelectionChange(event: MatOptionSelectionChange<string>) {
    if (event.isUserInput===true){
      for (let i = 0; i < this.productCategories.length; i++) {
        if (this.productCategories[i].categoryName === event.source.value) {
          this.productId = i + 1;
        }
      }
    }
  }
}
