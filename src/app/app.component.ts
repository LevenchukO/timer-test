import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription, fromEvent} from 'rxjs';
import {buffer, debounce, filter, map} from 'rxjs/operators';
import { interval, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  hours: number;
  minutes: number;
  seconds: number;
  isStart = false;

  timer$

  sub: Subscription;
  sub2: Subscription;

  @ViewChild('btn') btn_ref: ElementRef;

  constructor() {
    this.hours = 23;
    this.minutes = 58;
    this.seconds = 55;
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.timer$ = interval(1000);
    this.sub2 = fromEvent(this.btn_ref.nativeElement, 'click')
      .pipe(buffer(fromEvent(this.btn_ref.nativeElement, 'click').pipe(debounce(() => timer(300)))))
      .pipe(map(list => list.length)).pipe(filter(x => x === 2)).subscribe(() => {
      this.stop();
    });
  }

  go() {
    if (this.seconds >= 59) {this.minutes += 1; this.seconds = 0; } else {this.seconds += 1; }
    if (this.minutes > 59) {this.hours += 1; this.minutes = 0; this.seconds = 0; }
    if (this.hours > 23) {this.hours = 0; this.minutes = 0; this.seconds = 0; }
  }
  start() {
    if (!this.isStart) {
      this.sub = this.timer$.subscribe( tic => {
        this.isStart = true;
        this.go();
      });
    }
  }
  stop() {
    this.isStart = false;
    this.sub.unsubscribe();
  }
  reset() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

}
