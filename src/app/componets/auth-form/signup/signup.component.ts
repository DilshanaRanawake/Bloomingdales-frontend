import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:any = new FormGroup({
    fName: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(45)]),
    lName: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(45)]),
    userName: new FormControl(null,[Validators.required, Validators.maxLength(10)]),
    password: new FormControl(null,[Validators.required, Validators.minLength(6),Validators.maxLength(16)]),
  });
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSignup():any {
    const userData = {
      "userName":this.signupForm.get('fName').value,
      "userFirstName":this.signupForm.get('lName').value,
      "userLastName":this.signupForm.get('userName').value,
      "userPassword":this.signupForm.get('password').value
    }
this.userService.createNewUser(userData).subscribe(data=>{
  console.log(data)
})
    return this.router.navigate(['auth/login'])
  }
}
