export class StockProduct{
  public productName: string;
  public productPrice: number;
  public productDescription: string;
  public productImage: string;
  public isChosenCategoryType: boolean;
  public isChosenPriceRange: boolean;
  public productType: string;
  public productAmount: number;

  constructor(productName:string, productPrice:number, productDescription:string,
              productImage: string, productType: string, productAmount: number) {
    this.productName=productName;
    this.productPrice=productPrice;
    this.productDescription=productDescription;
    this.productImage = productImage;
    this.productType = productType;
    this.isChosenCategoryType = false;
    this.isChosenPriceRange = false;
    this.productAmount = productAmount;
  }

}
