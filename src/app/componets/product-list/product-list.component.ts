import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products:Product[];
  currentCategoryId:number=1;
  previousCategoryId: number=1;
  searchMode:boolean=false;

  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;
  pageEvent:PageEvent | undefined;

  constructor(private cartService:CartService,private productService:ProductService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{

        this.listProducts();

    });
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }

  handleListProducts(){
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
    console.log("rgty"+this.products);
    if (hasCategoryId){
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId=1;
    }
    if (this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1
    }
    this.previousCategoryId=this.currentCategoryId;

    console.log("sdfr"+this.products);
    this.productService.getProductListPaginate(this.thePageNumber-1,this.thePageSize,this.currentCategoryId).subscribe((res)=>{

      this.processResult(res);
      console.log("res"+this.theTotalElements);
    });
      console.log("wqer"+this.theTotalElements);

  }

  public processResult(data){
      this.products= data._embedded.products;
      this.thePageNumber = data.page.number;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      console.log("asdfgh"+this.products[0]);
  }

  public processSearchResult(data){
      this.products= data._embedded.products;
      this.thePageNumber = data.page.number;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;

  }



  private handleSearchProducts() {



    const theKeyword:string|undefined = this.route.snapshot.paramMap.get('keyword')!;
    if (theKeyword !== 'undefined') {
      this.productService.searchProductPaginate(this.thePageNumber-1,this.thePageSize,theKeyword).subscribe((res)=>{
        this.processSearchResult(res);
      });
    }



  }

  loadServerData(event: PageEvent):any {
    const hasTheKeyword:boolean = this.route.snapshot.paramMap.has('keyword')!;
    if (!hasTheKeyword) {
      if (this.thePageNumber !== event.pageIndex  &&this.thePageSize !== event.pageSize){
        event.pageIndex=0;
      }
      this.thePageSize=event.pageSize;
      this.thePageNumber=event.pageIndex+1;
      this.handleListProducts();
    }else{
      this.thePageSize=event.pageSize;
      this.thePageNumber=event.pageIndex+1;
      this.handleSearchProducts();
    }
  }

  addToCart(product: Product) {

    const theCartItem = new CartItem(product);
    this.cartService.addToCart(theCartItem);
  }
}



