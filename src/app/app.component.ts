declare var require: any;
import { Component } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { of, Subscription } from 'rxjs';
import { concatMap, delay, retry, retryWhen, take, tap, timeout } from 'rxjs/operators';
import { DataLabelsOptions, SeriesHeatmapOptions, SeriesSplineOptions, SeriesOptionsType } from "highcharts";
import * as Highcharts from 'highcharts';
// import darkTheme from "./dark";

// const More = require('highcharts/highcharts-more');
// More(Highcharts);


// const Exporting = require('highcharts/modules/exporting');
// Exporting(Highcharts);

// const ExportData = require('highcharts/modules/export-data');
// ExportData(Highcharts);

// const Accessibility = require('highcharts/modules/accessibility');
// Accessibility(Highcharts);
const heatmap = require("highcharts/modules/heatmap.js");
// const stockChart = require("highcharts/modules/stockChart.js");
heatmap(Highcharts)
// stockChart(Highcharts)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  updateFlag: boolean = false;
  fontSize = '8px';
  borderWidth = 0
  wsOrdersPerpetualByBit = webSocket('wss://stream.bybit.com/realtime_public')
  wsTradesPerpetualByBit = webSocket('wss://stream.bybit.com/realtime_public')//USDT Perpetual
  wsOrdersSpotByBit = webSocket('wss://stream.bybit.com/spot/quote/ws/v2')//Spot
  wsTradesSpotByBit = webSocket('wss://stream.bybit.com/spot/quote/ws/v2')//Spot
  wsOrdersAllBinance = webSocket('wss://stream.binance.com:9443/ws/btcusdt@depth')//Spot
  dataLabels: boolean = true;

  Highcharts: any = Highcharts;
  dataForChart: any = [
    {
      data: [],
    },
    {
      data: [],
    },
    {
      data: [],
    },
    {
      data: [],
    },

    {
      data: [],
    },
    {
      data: [],
    },

    {
      data: [],
    },

    {
      data: [],
    },
  ];

  chartOptions: any = {
    plotOptions: {
      series: {
        enableMouseTracking: false
      }
    },
    series: [
      {
        type: 'heatmap',
        name: "Buy",
        colorAxis: 0,
        pointPadding: 0,
        // pointStart: Date.now(),
        // pointInterval: 100,
        // borderColor: "green",
        "borderWidth": this.borderWidth,
        // "borderRadius": 1,
        // "pointPadding": 5,
        // gapSize: 50,
        // borderWidth: 10,
        data: [],

        // marker: {
        //   radius: 10
        // },
        // tooltip: {
        //   enabled: false
        // },
        //   marker: {
        //     enabled: false,
        // },
        dataLabels: {
          enabled: this.dataLabels,
          style: {
            fontSize: this.fontSize,
          },
          color: 'green',
          y: 3,

          // color: "#000000",
          // padding:0,
        } as DataLabelsOptions
      },
      {
        type: 'heatmap',
        name: "Sell",
        // color: '#f4b042',
        // colorKey: 'x',
        colorAxis: 1,
        pointPadding: 0,
        // pointStart: Date.now(),
        // pointInterval: 100,
        // borderColor: "red",
        "borderWidth": this.borderWidth,
        // "borderRadius": 1,
        // "pointPadding": 5,
        // x: 1,
        // borderWidth: 10,
        data: [],
        dataLabels: {
          enabled: this.dataLabels,
          style: {
            fontSize: this.fontSize,
          },
          color: 'red',

          y: -8,

          // color: "#000000",
          // padding:10,

        } as DataLabelsOptions
      },

      {
        type: 'heatmap',
        name: "BuySpot",
        colorAxis: 0,
        pointPadding: 0,
        // pointStart: Date.now(),
        // pointInterval: 100,
        // borderColor: "green",
        "borderWidth": this.borderWidth,
        // "borderRadius": 1,
        // "pointPadding": 5,
        // gapSize: 50,
        // borderWidth: 10,
        data: [],

        // marker: {
        //   radius: 10
        // },
        // tooltip: {
        //   enabled: false
        // },
        //   marker: {
        //     enabled: false,
        // },
        dataLabels: {
          enabled: this.dataLabels,
          style: {
            fontSize: this.fontSize,
          },
          color: "blue",
          y: 3,
          // color: "#000000",
          // padding:0,
        } as DataLabelsOptions
      },
      {
        type: 'heatmap',
        name: "SellSpot",
        colorAxis: 1,
        pointPadding: 0,
        // pointStart: Date.now(),
        // pointInterval: 100,
        // borderColor: "green",
        "borderWidth": this.borderWidth,
        // "borderRadius": 1,
        // "pointPadding": 5,
        // gapSize: 50,
        // borderWidth: 10,
        data: [],

        // marker: {
        //   radius: 10
        // },
        // tooltip: {
        //   enabled: false
        // },
        //   marker: {
        //     enabled: false,
        // },
        dataLabels: {
          enabled: this.dataLabels,
          style: {
            fontSize: this.fontSize,
          },
          color: "blue",
          y: -8,
          // color: "#000000",
          // padding:0,
        } as DataLabelsOptions
      },

      {
        type: "spline",
        name: "Price",
        color: '#ffff00',
        data: [],
        marker: {
          enabled: false,
          // lineWidth: 2,
          // lineColor: 'yellow',
          // fillColor: 'white'
        },
        dashStyle: 'shortdot',
      },
      {
        type: "spline",
        name: "PriceSpot",
        color: 'red',
        data: [],
        marker: {
          enabled: false,
          // lineWidth: 2,
          // lineColor: 'red',
          // fillColor: 'white'
        },
        dashStyle: 'shortdot',
      },
      {
        type: 'heatmap',
        name: "BuyBinance",
        colorAxis: 0,
        pointPadding: 0,
        // pointStart: Date.now(),
        // pointInterval: 100,
        // borderColor: "green",
        "borderWidth": this.borderWidth,
        // "borderRadius": 1,
        // "pointPadding": 5,
        // gapSize: 50,
        // borderWidth: 10,
        data: [],

        // marker: {
        //   radius: 10
        // },
        // tooltip: {
        //   enabled: false
        // },
        //   marker: {
        //     enabled: false,
        // },
        dataLabels: {
          enabled: this.dataLabels,
          style: {
            fontSize: this.fontSize,
          },
          color: "blue",
          y: 3,
          // color: "#000000",
          // padding:0,
        } as DataLabelsOptions
      },
      {
        type: 'heatmap',
        name: "SellBinance",
        colorAxis: 1,
        pointPadding: 0,
        // pointStart: Date.now(),
        // pointInterval: 100,
        // borderColor: "green",
        "borderWidth": this.borderWidth,
        // "borderRadius": 1,
        // "pointPadding": 5,
        // gapSize: 50,
        // borderWidth: 10,
        data: [],

        // marker: {
        //   radius: 10
        // },
        // tooltip: {
        //   enabled: false
        // },
        //   marker: {
        //     enabled: false,
        // },
        dataLabels: {
          enabled: this.dataLabels,
          style: {
            fontSize: this.fontSize,
          },
          color: "blue",
          y: -8,
          // color: "#000000",
          // padding:0,
        } as DataLabelsOptions
      },
      // {
      //   type: 'spline',
      //   colorAxis: 2,
      //   name: 'BTC',
      //   // color: '#f4b042',
      //   color: '#41aff4',
      //   // colorKey: 'x',
      //   data: [],

      // } as SeriesSplineOptions,
      // {
      //   type: 'pie',
      //   name: 'Total consumption',
      //   data: [{
      //     name: 'Jane',
      //     y: 13,
      //     color: '#41aff4' // Jane's color
      //   }, {
      //     name: 'John',
      //     y: 23,
      //     color: '#41aff4' // John's color
      //   }, {
      //     name: 'Joe',
      //     y: 19,
      //     color: '#41aff4' // Joe's color
      //   }],
      //   center: [100, 80],
      //   size: 100,
      //   showInLegend: false,
      //   dataLabels: {
      //     enabled: false
      //   }
      // },
    ]
    ,
    boost: {
      useGPUTranslations: true,
      // usePreAllocated: true
    },
    legend: {
      reversed: true,
      align: 'right',
      layout: 'vertical',
      // margin: 100,
      verticalAlign: 'middle',
      // y: 220,
      symbolHeight: 280,

    },
    title: {
      text: 'HeatMap BTC BYBIT Derivatives/Spot',
      align: 'center',
      // x: 40
    },
    credits: { enabled: false },
    tooltip: { enabled: false },
    // subtitle: {
    //     text: 'Temperature variation by day and hour through 2017',
    //     align: 'left',
    //     x: 40
    // },
    colorAxis: [
      {
        minColor: '#ffffff',
        maxColor: '#32b841',
        min: 0,
        max: 80,
      }, {
        minColor: '#ffffff',
        maxColor: '#ff661f',
        min: 0,
        max: 80,
      },
      // , {
      //   minColor: '#00e1ff',
      //   maxColor: '#00e1ff',
      //   min: 0,
      //   max: 80,
      // },
      // {
      //   minColor: '#ffffff',
      //   maxColor: '#2134db'
      // },

      //   {
      //   stops: [
      //     [0, '#3060cf'],
      //     [10, '#fffbbc'],
      //     [50, '#c4463a'],
      //     [100, '#c4463a']
      //   ],
      //   min: 0,
      //   max: 99,
      //   startOnTick: false,
      //   endOnTick: false,
      //   labels: {
      //     format: '{value}℃'
      //   }
      // },

      //   colorAxis: {
      //     stops: [
      //         [0, '#3060cf'],
      //         [0.5, '#fffbbc'],
      //         [0.9, '#c4463a'],
      //         [1, '#c4463a']
      //     ],
      //     min: 0,
      //     max: 99,
      //     startOnTick: false,
      //     endOnTick: false,
      //     labels: {
      //         format: '{value}℃'
      //     }
      // },

      // xAxis: {
      //   categories: [
      //     'Alexander',
      //     'Marie',
      //     'Maximilian',
      //     'Sophia',
      //     'Lukas',
      //     'Maria',
      //     'Leon',
      //     'Anna',
      //     'Tim',
      //     'Laura',
      //   ],
      // },

      // yAxis: {
      //   categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      //   title: null,
      //   reversed: true,
      // },
    ],
    yAxis: {
      opposite: true
    },
    xAxis: {
      labels: {
        enabled: false
      },
    },
    exporting: {
      enabled: true
    },

  }
  darkTheme: any = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, '#2a2a2b'],
          [1, '#3e3e40']
        ]
      },
      style: {
        fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
    },
    title: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '20px'
      }
    },
    subtitle: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase'
      }
    },
    xAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
        style: {
          color: '#A0A0A3'

        }
      }
    },
    yAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
        color: '#F0F0F0'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: '#B0B0B3'
        },
        marker: {
          lineColor: '#333'
        }
      },
      boxplot: {
        fillColor: '#505053'
      },
      candlestick: {
        lineColor: 'white'
      },
      errorbar: {
        color: 'white'
      }
    },
    legend: {
      itemStyle: {
        color: '#E0E0E3'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#606063'
      }
    },
    credits: {
      style: {
        color: '#666'
      }
    },
    labels: {
      style: {
        color: '#707073'
      }
    },

    drilldown: {
      activeAxisLabelStyle: {
        color: '#F0F0F3'
      },
      activeDataLabelStyle: {
        color: '#F0F0F3'
      }
    },

    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        theme: {
          fill: '#505053'
        }
      }
    },

    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: '#505053',
        stroke: '#000000',
        style: {
          color: '#CCC'
        },
        states: {
          hover: {
            fill: '#707073',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          },
          select: {
            fill: '#000003',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          }
        }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
      },
      labelStyle: {
        color: 'silver'
      }
    },

    navigator: {
      handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
        color: '#7798BF',
        lineColor: '#A6C7ED'
      },
      xAxis: {
        gridLineColor: '#505053'
      }
    },

    scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
    },

    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
  };

  // Highcharts.Options = {}
  order_bookBybit: any = [];
  order_SpotbookBybit: any = [];
  pricePerpetualBybit: number = 0;
  priceSpotBybit: number = 0;
  tradesBybit = []
  ordersBinance: any = []
  tim = 1

  tooltip: boolean = false
  minValue: number = 10
  maxX: number = 50
  ngOnInit() {
    Highcharts.setOptions(this.darkTheme);
    this.getOrdersPerpetualBybit()
    this.getTradesPerpetualBybit()
    this.getOrdersSpotBybit()
    this.getTradesSpotBybit()
    // this.getOrdersAllBinance()
    // this.insertOrderBookToChart()
    setInterval(() => {
      this.insertDataToChart()
      this.plotGraph()
      // this.control()
      // this.updateFlag = true;
    }, 2000)
  }
  plotGraph() {

    this.chartOptions.series[0] = {
      data: [...this.dataForChart[0].data],
      dataLabels: { enabled: this.dataLabels }
    }
    this.chartOptions.series[1] = {
      data: [...this.dataForChart[1].data],
      dataLabels: { enabled: this.dataLabels }
    }
    this.chartOptions.series[2] = {
      data: [...this.dataForChart[2].data],
      dataLabels: { enabled: this.dataLabels }
    }
    this.chartOptions.series[3] = {
      data: [...this.dataForChart[3].data],
      dataLabels: { enabled: this.dataLabels }
    }
    this.chartOptions.series[4] = {
      data: [...this.dataForChart[4].data],
    }
    this.chartOptions.series[5] = {
      data: [...this.dataForChart[5].data],
    }




    this.updateFlag = true;


  }
  getTradesPerpetualBybit() {
    this.wsTradesPerpetualByBit.pipe(
      retryWhen(errors => {
        return errors
          .pipe(
            tap(() => {
              console.log('getTradesPerpetualBybit retrying...', errors)
              this.wsOrdersSpotByBit.next({
                "topic": "depth",
                "event": "sub",
                "params": {
                  "symbol": "BTCUSDT",
                  "binary": false
                }
              });
            })
          );
      })
    ).subscribe((o: any) => {
      if (o.hasOwnProperty('data')) {
        this.pricePerpetualBybit = Number(o.data[0].price)
      }

    })
    this.wsTradesPerpetualByBit.next({ "op": "subscribe", "args": ["trade.BTCUSDT"] });
  }
  getTradesSpotBybit() {
    this.wsTradesSpotByBit.pipe(
      retryWhen(errors => {
        return errors
          .pipe(
            tap(() => {
              console.log('wsTradesSpotByBit retrying...', errors)
              this.wsOrdersSpotByBit.next({
                "topic": "depth",
                "event": "sub",
                "params": {
                  "symbol": "BTCUSDT",
                  "binary": false
                }
              });
            })
          );
      })
    ).subscribe((o: any) => {
      if (o.hasOwnProperty('data')) {
        this.priceSpotBybit = Number(o.data.p)
      }

    },
      // err => console.log('MyError',err), // Called if at any point WebSocket API signals some kind of error.
      // () => console.log('MyError complete') // Called when connection is closed (for whatever reason).
    )
    this.wsTradesSpotByBit.next({
      "topic": "trade",
      "params": {
        "symbol": "BTCUSDT",
        "binary": false
      },
      "event": "sub"
    });
    setInterval(() => {
      this.wsTradesSpotByBit.next({ "ping": Date.now() });
    }, 30000)
  }
  getOrdersPerpetualBybit() {
    this.wsOrdersPerpetualByBit.pipe(
      retryWhen(errors => {
        return errors
          .pipe(
            tap(() => {
              console.log('wsOrdersPerpetualByBit retrying...', errors)
              this.wsOrdersSpotByBit.next({
                "topic": "depth",
                "event": "sub",
                "params": {
                  "symbol": "BTCUSDT",
                  "binary": false
                }
              });
            })
          );
      })
    ).subscribe((data: any) => {
      if (data.type == 'snapshot') {
        this.order_bookBybit = data
      }
      if (data.type == 'delta') {
        const order_book = this.order_bookBybit.data.order_book

        data.data.delete.map((o: any) => {
          const index = order_book.findIndex((elem: any) => elem.id == o.id)
          order_book.splice(index, 1);
          // if (index == -1) console.log('-1 delete o:', o, 'order_book:', order_book);

        })

        data.data.insert.map((o: any) => {
          order_book.push(o)
        })

        data.data.update.map((o: any) => {
          const index = order_book.findIndex((elem: any) => elem.id == o.id)
          order_book[index] = o;
          // if (index == -1) console.log('o:', o, 'order_book:', order_book);
        })
      }

    });


    this.wsOrdersPerpetualByBit.next({ "op": "subscribe", "args": ["orderBook_200.100ms.BTCUSDT"] });

  }
  getOrdersSpotBybit() {
    this.wsOrdersSpotByBit.pipe(
      retryWhen(errors => {
        return errors
          .pipe(
            tap(() => {
              console.log('wsOrdersSpotByBit retrying...', errors)
              this.wsOrdersSpotByBit.next({
                "topic": "depth",
                "event": "sub",
                "params": {
                  "symbol": "BTCUSDT",
                  "binary": false
                }
              });
            })
          );
      })
    ).subscribe((o: any) => {

      this.order_SpotbookBybit = o


    })
    this.wsOrdersSpotByBit.next({
      "topic": "depth",
      "event": "sub",
      "params": {
        "symbol": "BTCUSDT",
        "binary": false
      }
    });
    setInterval(() => {
      this.wsOrdersSpotByBit.next({ "ping": Date.now() });
    }, 29000)
  }
  getOrdersAllBinance() {
    this.wsOrdersAllBinance.pipe().subscribe((o: any) =>
      this.ordersBinance = o
    )

    // this.wsTradesAllBinance.next({

    // });
  }
  insertDataToChart() {

    // console.log('this.order_bookBybit',this.order_bookBybit);
    // this.dataForChart[0].data = []
    // this.dataForChart[1].data = []

    if (this.order_bookBybit.data.order_book) {
      this.order_bookBybit.data.order_book.map((o: any) => {

        if (o.size > this.minValue) {
          if (o.side == 'Buy') {

            this.dataForChart[0].data.push([this.tim, Number(o.price), Math.ceil(o.size)])
          }
          if (o.side == 'Sell') {

            this.dataForChart[1].data.push([this.tim, Number(o.price), Math.ceil(o.size)])
          }
        }
      })
    }

    if (this.order_SpotbookBybit.topic == 'depth') {

      this.order_SpotbookBybit.data.b.map((o: any) => {

        if (o[1] > 1) {

          this.dataForChart[2].data.push([this.tim, Number(o[0]), Math.ceil(Number(o[1]))])
        }
      })

      this.order_SpotbookBybit.data.a.map((o: any) => {

        if (o[1] > 1) {
          this.dataForChart[3].data.push([this.tim, Number(o[0]), Math.ceil(Number(o[1]))])

        }
      })
    }
    //Binance----
    // if (this.ordersBinance) {

    //   this.ordersBinance.a.map((o: any) => {

    //     if (o[1] > 1) {

    //       this.dataForChart[6].data.push([this.tim, Number(o[0]), Math.ceil(Number(o[1]))])
    //     }
    //   })

    //   this.order_SpotbookBybit.b.map((o: any) => {

    //     if (o[1] > 1) {
    //       this.dataForChart[7].data.push([this.tim, Number(o[0]), Math.ceil(Number(o[1]))])

    //     }
    //   })
    // }
    //------
    
    if (this.pricePerpetualBybit) this.dataForChart[4].data.push([this.tim, this.pricePerpetualBybit])
    if (this.priceSpotBybit) this.dataForChart[5].data.push([this.tim, this.priceSpotBybit])

    if (this.tim > this.maxX) {
      this.dataForChart.map((o: any, index: number) => {
        o.data = o.data.filter((o: any) => o[0] > this.tim - this.maxX)
      })


      // this.dataForChart[0].data = this.dataForChart[0].data.filter((o: any) => o[0] > this.tim - this.maxX)
      // this.dataForChart[1].data = this.dataForChart[1].data.filter((o: any) => o[0] > this.tim - this.maxX)
      // this.dataForChart[2].data = this.dataForChart[2].data.filter((o: any) => o[0] > this.tim - this.maxX)
      // this.dataForChart[3].data = this.dataForChart[3].data.filter((o: any) => o[0] > this.tim - this.maxX)
      // this.dataForChart[4].data = this.dataForChart[4].data.filter((o: any) => o[0] > this.tim - this.maxX)
      // this.dataForChart[2].data.splice(0, 1)
    }
    // if (this.dataForChart[0].data.length > 1000) this.dataForChart[0].data.splice(0, 200);
    // if (this.dataForChart[1].data.length > 1000) this.dataForChart[1].data.splice(0, 200);
    this.tim++

  }
  control() {
    // console.log(this.tim);
    // console.log(this.maxX);
    // console.log(this.dataForChart);
    // console.log(this.dataForChart[0].data);


    // console.log('this.order_bookBybit.data.order_book', this.order_bookBybit.data.order_book.length);
    // console.log('this.order_SpotbookBybit A', this.order_SpotbookBybit.data.a.length);
    // console.log('this.order_SpotbookBybit B', this.order_SpotbookBybit.data.b.length);

    console.log('this.dataForChart[0].data', this.dataForChart[0].data.length);
    console.log('this.dataForChart[1].data', this.dataForChart[1].data.length);
    console.log('this.dataForChart[2].data', this.dataForChart[2].data.length);
    console.log('this.dataForChart[3].data', this.dataForChart[3].data.length);
    console.log('this.dataForChart[4].data', this.dataForChart[4].data.length);
    // console.log('this.dataForChart[0].data',this.dataForChart[0].data);
    // console.log('this.dataForChart[1].data',this.dataForChart[1].data);
    // console.log('this.dataForChart[2].data',this.dataForChart[2].data);

  }
}

