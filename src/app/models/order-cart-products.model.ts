import {CartProduct} from "./cart-product.model";

export class OrderCartProducts{
  public orderId: number;
  public cartProducts:CartProduct[];

  constructor(orderId: number, cartProducts: CartProduct[]) {
    this.orderId = orderId;
    this.cartProducts = cartProducts;
  }
}
