import {Component, Input, OnInit} from '@angular/core';
import {StockProduct} from '../../../../models/product/stock-product.model';
import {Router} from '@angular/router';
import {ProductImagesService} from '../../../../services/product-images/product-images.service';
import {Product} from '../../../../models/product/product.model';
import {TokensService} from '../../../../services/tokens/tokens.service';

@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html',
  styleUrls: ['./stock-product.component.css']
})
export class StockProductComponent implements OnInit{
  @Input() public stockProduct: StockProduct;
  public productImage: string;
  public isPopUpOpened: boolean;

  constructor(private tokensService: TokensService, private router: Router, private productImagesService: ProductImagesService) {
    this.isPopUpOpened = false;
  }

  ngOnInit(): void {
    const product: Product = this.stockProduct.product;
    this.productImage = this.productImagesService.getBasicImageURL(product);
    this.productImagesService.getProductImage(product)
      .subscribe((imageLink: string) => this.productImage = imageLink);
  }

  public isClientAuthenticated(): boolean{
    return (this.tokensService.isAccessTokenExisted() && !this.tokensService.isAccessTokenExpired()
      && this.tokensService.getUserRole() === 'ROLE_USER') || this.tokensService.isRefreshTokenExisted();
  }

  public addProductToShoppingCart(): void{
    if (this.isClientAuthenticated()){
      this.isPopUpOpened = true;
    }
    else{
      this.router.navigate(['/logIn']);
    }
  }
  public clickClosePopUpButtonEventListener(): void{
    this.isPopUpOpened = false;
  }
}
