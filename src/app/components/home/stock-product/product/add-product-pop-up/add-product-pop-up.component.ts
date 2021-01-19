import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StockProduct} from "../../../../../models/stock-product.model";
import {CartProductService} from "../../../../../services/cart-product/cart-product.service";
import {ActiveOrder} from "../../../../../services/active-order/active-order.service";
import {CartProduct} from "../../../../../models/cart-product.model";

@Component({
  selector: 'app-add-product-pop-up',
  templateUrl: './add-product-pop-up.component.html',
  styleUrls: ['./add-product-pop-up.component.css']
})
export class AddProductPopUpComponent implements OnInit{
  @Input() public stockProduct: StockProduct;
  @Output() public clickClosePopUpButtonEvent = new EventEmitter();
  public errorMessage: string = '';

  constructor(private cartProductService: CartProductService, public activeOrder: ActiveOrder) {}


  ngOnInit(): void {}

  public getProductAmount(): number{
    if(this.activeOrder.findCartProductByName(this.stockProduct.productName) !=null){
      return this.activeOrder.findCartProductByName(this.stockProduct.productName).amount;
    }
    else {
      let cartProduct: CartProduct = new CartProduct(null, this.stockProduct.productImage, this.stockProduct.productDescription, 0, this.stockProduct.productName)
      this.activeOrder.cartProducts.push(cartProduct);
      return 0;
    }
  }
  public addProduct(): void{
    let product: CartProduct = this.activeOrder.findCartProductByName(this.stockProduct.productName);
    product.amount++;
  }
  public deleteProduct(): void{
    let product: CartProduct = this.activeOrder.findCartProductByName(this.stockProduct.productName);
    if(product.amount != 0){
      product.amount--;
    }
  }

  public addProductToCart(): void{
    let productAmount: number = this.getProductAmount();
    this.cartProductService.addProductToCart(this.stockProduct.productName, productAmount)
      .then(() => {
        this.clickClosePopUpButtonEvent.emit();
        this.activeOrder.getCartsProductsFromActiveOrder();
      })
      .catch(() => this.errorMessage = 'There are not enough products in stock')
  }


  public closePopUp(): void{
    this.clickClosePopUpButtonEvent.emit()
  }

}
