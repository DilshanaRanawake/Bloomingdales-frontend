import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../../services/cart.service";
import {UserService} from "../../../services/user.service";
import {UserAuthService} from "../../../services/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginForm = new FormGroup({
    username: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    password: new FormControl(null,[Validators.required, Validators.minLength(6),Validators.maxLength(16)]),
  });
  constructor(private userService:UserService
    ,private userAuthService:UserAuthService,
              private router:Router
  ) {
  }

  onLogin() {
    this.userService.login({
      userName: this.loginForm.get('username')!.value,
      userPassword: this.loginForm.get('password')!.value})
      .subscribe((response:any)=>{

          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);

          const role = response.user.role[0].roleName;
          if (role === 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }

      },
        (error) => {
          console.log(error);
        }

      );
  }
}
