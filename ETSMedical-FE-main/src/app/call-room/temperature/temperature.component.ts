import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { PatientDataSrService } from '../../_services/patient-data-sr.service';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent{

  @Input()
  temperature: any;
  @Input()
  temperatureLabels: any;
  constructor() { }


 public chartOptions: (ChartOptions & { annotation: any }) = {
    responsive: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public chartType: string = 'line';
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: '#5491DA' }]
  public lineChartPlugins = [pluginAnnotations];

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ]


  ngOnInit(): void {
  }

}
