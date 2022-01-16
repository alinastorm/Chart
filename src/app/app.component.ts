import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { webSocket } from 'rxjs/webSocket';
import { of, Subscription } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chart';
  rate: any;
  // rate$: Subscription;
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  subject = webSocket('wss://ws.coincap.io/prices?assets=bitcoin')
  ngOnInit() {
    this.rate = this.subject.pipe(
      concatMap(item => of(item).pipe())
    ).subscribe(data => {
      this.rate = data;
      this.chardata.push(Number(this.rate.bitcoin))
      this.chartOptions = {
        series: [{
          data: this.chardata,
        },],
        chart: {
          type: "line",
          zoomType: 'x'
        },
        title: {
          text: "linechart",
        },
      };
    })
  }
}
