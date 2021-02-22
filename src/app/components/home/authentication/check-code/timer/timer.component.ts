import {Component, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnChanges{
  public seconds: number;
  public interval;
  @Output()
  public timerStopEvent = new EventEmitter();
  @Input() public isButtonDisabled;

  constructor() {
    this.seconds = 59;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isButtonDisabled){
      this.startTimer();
    }
    else{
      this.stopTimer();
    }
  }

  private startTimer(): void{
    this.interval = setInterval(() => {
      if (this.seconds === 0){
          this.stopTimer();
      }
      else{
        this.seconds--;
      }
    }, 1000);
  }

  private stopTimer(): void{
    clearInterval(this.interval);
    this.timerStopEvent.emit();
  }

}
