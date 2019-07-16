// 5 Manage State in RxJS with StartWith and Scan

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

  constructor() {
    this.clock = Observable.merge(
      this.click$,
      Observable.interval(1000) // Now I'll change it back to 1s to make it more natural
    )
      .startWith(new Date())
      //.scan((acc, curr)=> acc);
      /*
      So in order to update this, I need to say that when something comes through, I want to grab a copy, so I'll say date is a new Date, and I just wanna grab the accumulator getTime, and then return that date
       // so now, since we have a copy of the date, it's going to behave exactly the same as before - it'll remain static, since it's just returning that copy. 

       But what we can do is take that date and change it! (*)
      */
      .scan((acc, curr)=> {
        const date = new Date(acc.getTime());

        date.setSeconds(date.getSeconds() + 1); // (*) so we'll say date.setSeconds, getSeconds and add 1
        // so now it's gonna update every 5 seconds, but it's also gonna update on click.

        return date;
      })
  }
}
