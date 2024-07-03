import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./componets/product-list/product-list.component";
import {ProductDetailsComponent} from "./componets/product-details/product-details.component";
import {CartDetailsComponent} from "./componets/cart-details/cart-details.component";
import {ProductCreateComponent} from "./componets/product-create/product-create.component";
import {LoginComponent} from "./componets/auth-form/login/login.component";
import {SignupComponent} from "./componets/auth-form/signup/signup.component";
import {AuthGuard} from "./componets/auth-form/auth.guard";

const routes: Routes = [
  {path:'auth',loadChildren:()=>import('./componets/auth-form/auth.module').then(m=>m.AuthModule)},
  {path:'cart-details',component:CartDetailsComponent},
  {path:'product-create',component:ProductCreateComponent, canActivate:[AuthGuard], data:{roles:['Admin']} },
  {path:'products/:id',component:ProductDetailsComponent},
  {path:'search/:keyword',component:ProductListComponent},
  {path:'category/:id',component:ProductListComponent},
  {path:'category',component:ProductListComponent},
  {path:'products',component:ProductListComponent},
  {path:'',redirectTo:'/products',pathMatch:'full'},
  {path:'**',redirectTo:'/products',pathMatch:'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard],
})
export class AppRoutingModule { }
