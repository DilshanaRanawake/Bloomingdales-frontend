import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {LoginComponent} from "../auth-form/login/login.component";
import {UserAuthService} from "../../services/user-auth.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice:number=0;
  totalQuantity:number=0;
  userRoles:string[];
  userRole:string;

  constructor(private cartService:CartService,
              private userAuthService:UserAuthService,
              private userService:UserService,
              private router:Router
  ) { }


  ngOnInit(): void {
    this.updateCartStatus();
  }


  private updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice=data
    );
    this.cartService.totalQuantity.subscribe(
      data=> this.totalQuantity=data
    );
  }

  logout() {
    this.userAuthService.clear();
  }

  public isLoggedIn() {
    this.userRoles=this.userAuthService.getRoles();
    this.userRole=this.userRoles?.[0]['roleName'];
    return this.userAuthService.isLoggedIn();
  }



}
