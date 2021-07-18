import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CartProduct} from '../../../../../models/product/cart-product.model';
import {ProductImagesService} from '../../../../../services/product-images/product-images.service';
import {Product} from '../../../../../models/product/product.model';
import {ActiveOrderService} from '../../../../../services/active-order/active-order.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  @Input() public cartProduct: CartProduct;
  @Input() public orderStatus: string;
  @Output() public changeCartPriceEvent = new EventEmitter();
  public cartProductImage: string;
  public showButton = false;
  public initialProductAmount: number;
  public errorMessage = '';

  constructor(private activeOrderService: ActiveOrderService, private productImageService: ProductImagesService) {}

  ngOnInit(): void {
    this.loadImage();
    this.initialProductAmount = this.cartProduct.amount;
  }

  private loadImage(): void{
    const product: Product = this.cartProduct.product;
    this.cartProductImage = this.productImageService.getBasicImageURL(product);
    this.productImageService.getProductImage(product)
      .subscribe((image: string) => this.cartProductImage = image);
  }

  public isOrderActive(orderStatus: string): boolean{
    return orderStatus === 'ACTIVE';
  }

  public addProduct(): void{
    this.cartProduct.amount++;
    this.showButton = this.cartProduct.amount !== this.initialProductAmount;
    this.changeCartPriceEvent.emit(this.cartProduct.product.price);
  }
  public deleteProduct(): void{
    if (this.cartProduct.amount !== 0){
      this.cartProduct.amount--;
      this.errorMessage = '';
      this.showButton = this.cartProduct.amount !== this.initialProductAmount;
      this.changeCartPriceEvent.emit(-this.cartProduct.product.price);
    }
  }

  public addProductToCart(): void{
    const amount = this.cartProduct.amount;
    this.activeOrderService.setCartProductAmount(this.cartProduct.product.name, amount)
      .subscribe(() => {
          this.activeOrderService.addProductToCartEvent.emit(amount);
          this.initialProductAmount = amount;
          this.showButton = false;
        },
        error => this.errorMessage = error.error);
  }

}
