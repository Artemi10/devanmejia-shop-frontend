import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {Routes,RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import {APP_BASE_HREF, CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SliderComponent } from './components/home/stock-product/slider/slider.component';
import {HomeComponent} from "./components/home/home.component";
import {LogInComponent} from "./components/home/authentication/log-in/log-in.component";
import {OrdersComponent} from "./components/home/cart/orders/orders.component";
import {CartProductsComponent} from "./components/home/cart/cart-products/cart-products.component";
import {SignUpComponent} from "./components/home/authentication/sign-up/sign-up.component";
import {FooterComponent} from "./components/home/footer/footer.component";
import {HeaderComponent} from "./components/home/header/header.component";
import {StockProductComponent} from "./components/home/stock-product/stock-product.component";
import {AuthenticationGuard} from "./guards/authentication/authentication.guard";


import {AuthErrorHandler} from "./services/authentication/auth-error.handler";
import {AuthHeaderInterceptor} from "./services/authentication/auth-header.interceptor";
import {AuthorizationGuard} from "./guards/authorization/authorization.guard";
import { ProductComponent } from './components/home/stock-product/product/product.component';
import { OrderComponent } from './components/home/cart/orders/order/order.component';
import { CartProductComponent } from './components/home/cart/cart-products/cart-product/cart-product.component';
import { FilterListComponent } from './components/home/stock-product/filter-list/filter-list.component';
import { FilterCategoryComponent } from './components/home/stock-product/filter-list/filter-category/filter-category.component';
import { FilterCategoryTypeComponent } from './components/home/stock-product/filter-list/filter-category/filter-category-type/filter-category-type.component';
import { FilterPriceComponent } from './components/home/stock-product/filter-list/filter-price/filter-price.component';
import { PriceSliderComponent } from './components/home/stock-product/filter-list/filter-price/price-slider/price-slider.component';
import {Ng5SliderModule} from "ng5-slider";
import { FilterSortComponent } from './components/home/stock-product/filter-list/filter-sort/filter-sort.component';
import { AddProductPopUpComponent } from './components/home/stock-product/product/add-product-pop-up/add-product-pop-up.component';
import { CartComponent } from './components/home/cart/cart.component';
import { ProductAmountComponent } from './components/home/header/product-amount/product-amount.component';


const appRoutes: Routes= [
  {path:'', component:StockProductComponent},
  {path:'cart', component:CartComponent, canActivate:[AuthenticationGuard]},
  {path:'logIn', component:LogInComponent, canActivate:[AuthorizationGuard]},
  {path:'signUp', component:SignUpComponent, canActivate:[AuthorizationGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    SignUpComponent,
    FooterComponent,
    HeaderComponent,
    OrdersComponent,
    CartProductsComponent,
    StockProductComponent,
    SliderComponent,
    ProductComponent,
    OrderComponent,
    CartProductComponent,
    FilterListComponent,
    FilterCategoryComponent,
    FilterCategoryTypeComponent,
    FilterPriceComponent,
    PriceSliderComponent,
    FilterSortComponent,
    AddProductPopUpComponent,
    CartComponent,
    ProductAmountComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    Ng5SliderModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true},
    {provide:ErrorHandler, useClass:AuthErrorHandler},
    {provide: APP_BASE_HREF, useValue:'/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
