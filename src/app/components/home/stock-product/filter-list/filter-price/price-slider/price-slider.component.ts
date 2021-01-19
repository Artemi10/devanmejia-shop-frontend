import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options} from "ng5-slider";
import {StockProductService} from "../../../../../../services/stock-product/stock-product.service";
import {PriceRange} from "../../../../../../models/price-range.model";

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrls: ['./price-slider.component.css']
})
export class PriceSliderComponent implements OnInit{
  @Input() maxPriceValue: number;
  @Input() minPriceValue: number;
  public minInputPriceValue: number;
  public maxInputPriceValue: number;
  public options: Options;
  @Output() changeRangeEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.maxInputPriceValue = this.maxPriceValue
    this.minInputPriceValue = this.minPriceValue;
    this.options = {
      floor: this.minPriceValue,
      ceil: this.maxPriceValue
    }
  }
  public minPriceValueInputChangeListener(valueString: string){
    let value: number = parseInt(valueString);
    if(value <= this.maxInputPriceValue){
      this.minInputPriceValue = value;
    }
  }

  public maxPriceValueInputChangeListener(valueString: string){
    let value: number = parseInt(valueString);
    if(value >= this.minInputPriceValue){
      this.maxInputPriceValue = value;
    }
  }

  public minPriceValueChangeListener(newValue: number): void{
    this.minInputPriceValue = newValue;
    let priceRange: PriceRange = new PriceRange(this.maxInputPriceValue, this.minInputPriceValue);
    this.changeRangeEvent.emit(priceRange)
  }

  public maxPriceValueChangeListener(newValue: number): void{
    this.maxInputPriceValue = newValue;
    let priceRange: PriceRange = new PriceRange(this.maxInputPriceValue, this.minInputPriceValue);
    this.changeRangeEvent.emit(priceRange)
  }


}
