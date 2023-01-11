import {Product} from "./product";

export class CartItem {
  id:string;
  name:string;
  image_url:string;
  unit_price:number;
  units_in_stock:number;

  constructor(product:Product) {
    this.id=product.id;
    this.name=product.name;
    this.image_url=product.image_url;
    this.unit_price=product.unit_price;

    this.units_in_stock=1;
  }

}
