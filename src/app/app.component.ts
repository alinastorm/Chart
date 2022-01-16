import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import {  webSocket} from 'rxjs/webSocket';
import { of,  Subscription} from 'rxjs';
import {  concatMap,  delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chart';
}
