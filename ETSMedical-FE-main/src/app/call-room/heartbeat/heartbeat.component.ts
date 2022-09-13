import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { PatientDataSrService } from 'src/app/_services/patient-data-sr.service';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.css']
})
export class HeartbeatComponent{

  @Input()
  heartbeat: any;
  @Input()
  heartbeatLabels: any;
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
      backgroundColor: 'rgba(240, 52, 52,0.2)',
      borderColor: 'rgba(240, 52, 52,1)',
      pointBackgroundColor: 'rgba(240, 52, 52,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(240, 52, 52,0.8)'
    }
  ]
}
