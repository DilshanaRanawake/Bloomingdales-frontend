import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './componets/product-list/product-list.component';
import {ProductService} from "./services/product.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ProductCategoryMenuComponent } from './componets/product-category-menu/product-category-menu.component';
import { SearchComponent } from './componets/search/search.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ProductDetailsComponent } from './componets/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgxPaginationModule} from "ngx-pagination";
import { CartStatusComponent } from './componets/cart-status/cart-status.component';
import { CartDetailsComponent } from './componets/cart-details/cart-details.component';
import { ProductCreateComponent } from './componets/product-create/product-create.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatBadgeModule} from "@angular/material/badge";
import {MatDialogModule} from "@angular/material/dialog";
import { LoginComponent } from './componets/auth-form/login/login.component';
import { SignupComponent } from './componets/auth-form/signup/signup.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {AuthGuard} from "./componets/auth-form/auth.guard";
import {AuthInterceptor} from "./componets/auth-form/auth.interceptor";
import {UserService} from "./services/user.service";
import {UserAuthService} from "./services/user-auth.service";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    ProductCreateComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        NgxPaginationModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatBadgeModule,
        MatDialogModule,
        MatExpansionModule
    ],
  providers: [
    AuthGuard,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
