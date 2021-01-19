export class CartProduct{
  public productImage: string;
  public productDescription: string;
  public amount: number;
  public productName: string;

  constructor(orderId: number, productImage: string, productDescription: string,  amount: number, productName: string) {
    this.productImage = productImage;
    this.productDescription = productDescription;
    this.amount = amount;
    this.productName = productName;
  }
}
