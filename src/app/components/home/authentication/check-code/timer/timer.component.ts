import {Component, Output, EventEmitter, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements AfterViewInit{
  public seconds: number;
  public interval;
  @Output()
  public timerStopEvent = new EventEmitter();

  constructor() {
    this.seconds = 59;
  }

  ngAfterViewInit(): void {
    this.startTimer();
  }

  public startTimer(): void{
    this.interval = setInterval(() => {
      if (this.seconds === 0){
          clearInterval(this.interval);
          this.timerStopEvent.emit();
      }
      else{
        this.seconds--;
      }
    }, 1000);
  }

}
