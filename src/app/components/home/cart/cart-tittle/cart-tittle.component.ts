import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-cart-tittle',
  templateUrl: './cart-tittle.component.html',
  styleUrls: ['./cart-tittle.component.css']
})
export class CartTittleComponent {
  @Input() public tittle: string;
  @Output() public clickButtonEvent = new EventEmitter();
  public isButtonShown: boolean;
  public isPanelShown: boolean;

  constructor() {
    this.isButtonShown = window.innerWidth < 768;
    this.isPanelShown = true;
  }

  public onResize(event: any): void{
    const width: number = event.target.innerWidth;
    const isSmallVersion: boolean = width < 768;
    if (isSmallVersion !== this.isButtonShown){
      this.isButtonShown = width < 768;
      this.isPanelShown = true;
    }

  }

  public clickOpenButtonListener(): void{
    this.clickButtonEvent.emit();
    this.isPanelShown = !this.isPanelShown;
  }
}
