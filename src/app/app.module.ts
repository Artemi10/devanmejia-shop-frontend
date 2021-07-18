import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SliderComponent } from './components/home/stock-products/slider/slider.component';
import {HomeComponent} from './components/home/home.component';
import {LogInComponent} from './components/home/auth/log-in/log-in.component';
import {OrdersComponent} from './components/home/cart/orders/orders.component';
import {CartProductsComponent} from './components/home/cart/cart-products/cart-products.component';
import {SignUpComponent} from './components/home/auth/sign-up/sign-up.component';
import {FooterComponent} from './components/home/footer/footer.component';
import {HeaderComponent} from './components/home/header/header.component';
import {StockProductsComponent} from './components/home/stock-products/stock-products.component';
import {AuthErrorHandler} from './services/auth/auth-error.handler';
import { StockProductComponent } from './components/home/stock-products/stock-product/stock-product.component';
import { OrderComponent } from './components/home/cart/orders/order/order.component';
import { CartProductComponent } from './components/home/cart/cart-products/cart-product/cart-product.component';
import { FilterListComponent } from './components/home/stock-products/filter-list/filter-list.component';
import { FilterCategoryComponent } from './components/home/stock-products/filter-list/filter-category/filter-category.component';
import { FilterCategoryTypeComponent } from './components/home/stock-products/filter-list/filter-category/filter-category-type/filter-category-type.component';
import { FilterPriceComponent } from './components/home/stock-products/filter-list/filter-price/filter-price.component';
import { PriceSliderComponent } from './components/home/stock-products/filter-list/filter-price/price-slider/price-slider.component';
import {Ng5SliderModule} from 'ng5-slider';
import { FilterSortComponent } from './components/home/stock-products/filter-list/filter-sort/filter-sort.component';
import { AddProductPopUpComponent } from './components/home/stock-products/stock-product/add-product-pop-up/add-product-pop-up.component';
import { CartComponent } from './components/home/cart/cart.component';
import { ProductAmountComponent } from './components/home/header/product-amount/product-amount.component';
import {RefreshTokenInterceptor} from './services/tokens/refesh-token.interceptor';
import { CartTittleComponent } from './components/home/cart/cart-tittle/cart-tittle.component';
import { CheckCodeComponent } from './components/home/auth/check-code/check-code.component';
import { TimerComponent } from './components/home/auth/check-code/timer/timer.component';
import {CheckCodeGuard} from './guards/check-code/check-code.guard';
import { ForgetPasswordComponent } from './components/home/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/home/auth/reset-password/reset-password.component';
import {ResetPasswordGuard} from './guards/reset-password/reset-password.guard';
import { CheckResetCodeComponent } from './components/home/auth/check-reset-code/check-reset-code.component';
import {CheckResetCodeGuard} from './guards/check-reset-code/check-reset-code.guard';
import {MainGuard} from './guards/main/main.guard';
import {AuthGuard} from './guards/auth/auth.guard';
import {TokensHeaderInterceptor} from './services/tokens/tokens-header.interceptor';
import { PricePipe } from './pipes/price.pipe';


const appRoutes: Routes = [
  {path: '', component: StockProductsComponent},
  {path: 'cart', component: CartComponent, canActivate: [MainGuard]},
  {path: 'logIn', component: LogInComponent, canActivate: [AuthGuard]},
  {path: 'signUp', component: SignUpComponent, canActivate: [AuthGuard]},
  {path: 'checkCode', component: CheckCodeComponent, canActivate: [CheckCodeGuard]},
  {path: 'checkReset', component: CheckResetCodeComponent, canActivate: [CheckResetCodeGuard]},
  {path: 'forget', component: ForgetPasswordComponent, canActivate: [AuthGuard]},
  {path: 'reset', component: ResetPasswordComponent, canActivate: [ResetPasswordGuard]}
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
    StockProductsComponent,
    SliderComponent,
    StockProductComponent,
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
    ProductAmountComponent,
    CartTittleComponent,
    CheckCodeComponent,
    TimerComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    CheckResetCodeComponent,
    PricePipe
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
      useClass: TokensHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    {provide: ErrorHandler, useClass: AuthErrorHandler},
    {provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
