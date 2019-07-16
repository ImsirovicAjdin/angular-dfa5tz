// 5 Manage State in RxJS with StartWith and Scan

/*
Since I want to control the clock like move the time forward or backward or whatever, 
right now I'm just pushing a new Date every 5 seconds or every time I click, what I need to do is actually track a date, and then make changes to that date. 

When I want to track someting in RxJS I wanna .startWith an initial value (new Date()),
and then every time some sort of event comes through, I'm gonna check for it -- .scan() --, and then change it.

That new date is that acc (accumulator), and then I can use the curr (current), the thing that comes through, to change the accumulator however I want. So to start with, I'm just going to return the accumulator to see what happens. It's just gonna return out that same value. The clock is no longer updating, it's just set to that initial value.
*/

import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan'; 
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'my-app',
  template: `
    <button (click)="click$.next()">Update</button>
    <h1>{{clock | async | date: 'MMM d, y, h:mm:ss a'}}</h1>
  `
})
export class AppComponent  {
  click$ = new Subject();
  clock;

  /*
  constructor(){
    this.clock = Observable.merge(
        this.click$,
        Observable.interval(5000)
    ).map(()=> new Date());
  }
  */
  constructor() {
    this.clock = Observable.merge(
      this.click$,
      Observable.interval(5000)
    )
      .startWith(new Date())
      .scan((acc, curr)=> acc);
  }
}
