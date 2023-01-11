import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations:[
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
  ]
})
export class AuthModule{}
