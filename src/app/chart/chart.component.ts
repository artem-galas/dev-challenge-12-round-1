import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import {saveAs} from 'file-saver';

import {ScheduleModel, scheduleType} from '../models/schedule.model';
import {CANVAS_WIDTH} from '../models/canvas-size.constat';

import {InfoGraph} from '../lib/info-graph';

/**
 * ChartComponent
 * @implements AfterViewInit
 *
 * @description
 * Create a canvas element for drawing
 *
 * @usage
 * <dev-challenge-chart [type]="'regular'" [schedule]="regularSchedule"></dev-challenge-chart>
 */
@Component({
  selector: 'dev-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {
  // Schedule Data for drawing
  @Input('schedule')
  public schedule: ScheduleModel;
  // Type of Schedule (regular or optimized)
  @Input('type')
  public type: scheduleType;
  // Element Reference for canvas element
  @ViewChild('canvas')
  public canvas: ElementRef;

  public canvasWidth = CANVAS_WIDTH;
  private infoGraph: InfoGraph;

  constructor() {
  }

  ngAfterViewInit() {
    // Create the InfoGraph and draw the graph
    this.infoGraph = new InfoGraph(this.schedule);
    const ctx = this.canvas.nativeElement.getContext('2d');
    this.infoGraph.drawInfoGraph(ctx, this.type);
  }

  /**
   * SaveInfo
   * @description
   * Open save file dialog and save a file as png
   */
  public saveInfo() {
    this.canvas.nativeElement
      .toBlob((blob) => {
        saveAs(blob, `${this.type}_schedule.png`);
      });
  }

}
