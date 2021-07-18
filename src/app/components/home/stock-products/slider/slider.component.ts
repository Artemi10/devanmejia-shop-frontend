import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  public showSlider: boolean;

  constructor() {
    this.showSlider = window.innerWidth >= 768;
  }

  public onResize(event): void{
    this.showSlider = event.target.innerWidth >= 768;
  }



}
