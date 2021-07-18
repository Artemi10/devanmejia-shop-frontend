import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Options} from "ng5-slider";
import {PriceRange} from '../../../../../../models/filter/price-range.model';

@Component({
  selector: 'app-price-slider',
  templateUrl: './price-slider.component.html',
  styleUrls: ['./price-slider.component.css']
})
export class PriceSliderComponent implements OnChanges{
  @Input() maxPriceValue: number;
  @Input() minPriceValue: number;
  public minInputPriceValue: number;
  public maxInputPriceValue: number;
  public options: Options;
  @Output() changeRangeEvent = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.maxInputPriceValue = this.maxPriceValue;
    this.minInputPriceValue = this.minPriceValue;
    this.options = {
      floor: this.minPriceValue,
      ceil: this.maxPriceValue
    };
  }

  public minPriceValueInputChangeListener(valueString: string): void{
    const value: number = parseInt(valueString, 10);
    if (value <= this.maxInputPriceValue){
      this.minInputPriceValue = value;
    }
  }

  public maxPriceValueInputChangeListener(valueString: string): void{
    const value: number = parseInt(valueString, 10);
    if (value >= this.minInputPriceValue){
      this.maxInputPriceValue = value;
    }
  }

  public minPriceValueChangeListener(newValue: number): void{
    this.minInputPriceValue = newValue;
    const priceRange: PriceRange = new PriceRange(this.maxInputPriceValue, this.minInputPriceValue);
    this.changeRangeEvent.emit(priceRange);
  }

  public maxPriceValueChangeListener(newValue: number): void{
    this.maxInputPriceValue = newValue;
    const priceRange: PriceRange = new PriceRange(this.maxInputPriceValue, this.minInputPriceValue);
    this.changeRangeEvent.emit(priceRange);
  }
}
