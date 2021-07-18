import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StockProduct} from '../../../../../models/product/stock-product.model';
import {ActiveOrderService} from '../../../../../services/active-order/active-order.service';

@Component({
  selector: 'app-add-product-pop-up',
  templateUrl: './add-product-pop-up.component.html',
  styleUrls: ['./add-product-pop-up.component.css']
})
export class AddProductPopUpComponent implements OnInit{
  @Input() public stockProduct: StockProduct;
  @Input() public productImage: string;
  @Output() public clickClosePopUpButtonEvent = new EventEmitter();
  public cartProductAmount: number;
  public errorMessage = '';

  constructor(public activeOrderService: ActiveOrderService) {}

  ngOnInit(): void {
    this.getProductAmount();
    this.activeOrderService.addProductToCartEvent
      .subscribe(() => this.getProductAmount());
  }

  private getProductAmount(): void{
    this.activeOrderService.getCartProductAmount(this.stockProduct.product.name)
      .subscribe((amount: number) => this.cartProductAmount = amount);
  }
  public addProduct(): void{
    this.cartProductAmount++;
  }
  public deleteProduct(): void{
    if (this.cartProductAmount !== 0){
      this.cartProductAmount--;
    }
  }

  public addProductToCart(): void{
    this.activeOrderService.setCartProductAmount(this.stockProduct.product.name, this.cartProductAmount)
      .subscribe(() => {
          this.clickClosePopUpButtonEvent.emit();
          this.activeOrderService.addProductToCartEvent.emit(this.cartProductAmount);
        },
    error => this.errorMessage = error.error);
  }

  public closePopUp(): void{
    this.clickClosePopUpButtonEvent.emit();
  }

}
