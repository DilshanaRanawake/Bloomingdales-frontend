import {Injectable, OnInit} from '@angular/core';
import {CartItem} from "../common/cart-item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{
  cartItems: CartItem[]=[];

  totalPrice: Subject<number>=new Subject<number>();
  totalQuantity: Subject<number>=new Subject<number>();

  constructor() { }

  ngOnInit(): void {
    }

  addToCart(theCartItem:CartItem){


    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: CartItem;

    if (this.cartItems.length>0){

      existingCartItem=this.cartItems.find(tempCartItem =>tempCartItem.id === theCartItem.id)!;
    }
    alreadyExistsInCart = (existingCartItem != undefined);

    if (alreadyExistsInCart){
      existingCartItem.units_in_stock++;
    }else{
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue:number = 0;
    let totalQuantityValue:number = 0;

    for (let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.unit_price*currentCartItem.units_in_stock;
      totalQuantityValue += currentCartItem.units_in_stock;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.units_in_stock--;
    if (cartItem.units_in_stock===0){
      this.remove(cartItem);
    }else{
      this.computeCartTotals()
    }
  }

  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);
    if (itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }

}
