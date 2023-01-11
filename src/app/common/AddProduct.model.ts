export class AddProductModel{
  constructor(category: { id: number; categoryName: string }, name: string, description: string, unit_price: number, image_url: string, active: boolean, units_in_stock: number) {
    this.category = category;
    this.name =name;
    this.description = description;
    this.unit_price = unit_price;
    this.image_url = image_url;
    this.active = active;
    this.units_in_stock = units_in_stock;
  }
  category:{"id":number,"categoryName":string};
  name:string;
  description:string;
  unit_price:number;
  image_url:string;
  active:boolean;
  units_in_stock:number;
}
