import * as moment from 'moment';

import {ScheduleElementModel, ScheduleModel} from '../models/schedule.model';

import {timeInterval} from './timeInterval';
import {CANVAS_WIDTH, ONE_HOUR} from '../models/canvas-size.constat';
import {COLOR} from '../models/color.constat';

interface DrawLineParams {
  x: number;
  y: number;
  lineWidth: number;
  lineHeight: number;
}

/** Class representing a InfoGraph.
 * @usage
 * class SomeComponent implements AfterViewInit {
 *  public schedule: ScheduleModel;
 *  private infoGraph: InfoGraph;
 *  constructor() {
 *    this.infoGraph = new InfoGraph(this.schedule);
 *  }
 *  ngAfterViewInit() {
 *   const canvas = <HTMLCanvasElement>document.querySelector('#canvas');
 *   const ctx = canvas.getContext('2d');
 *   this.infoGraph.drawInfoGraph(ctx);
 *  }
 */
export class InfoGraph {
  private schedule: ScheduleModel;
  private readonly xOffset = 100;

  /**
   * Create a InfoGraph.
   * @param {ScheduleModel} schedule
   */
  constructor(schedule: ScheduleModel) {
    this.schedule = schedule;
    this.rebuildScheduleData();
  }

  /**
   * Draw InfoGraph
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} type
   */
  public drawInfoGraph(ctx: CanvasRenderingContext2D, type: string) {
    ctx.fillStyle = COLOR['freeTime'];
    ctx.fillRect(this.xOffset, 150, CANVAS_WIDTH, 50);
    this.drawLabel(ctx, type);
    this.drawActivity(ctx);
    this.drawHourLabel(ctx);
    this.drawLineSeparator(ctx);
  }

  /**
   * CalculateWidth
   * @param {ScheduleElementModel} el
   * @returns {number}
   *
   * @description
   * Calculate width for activity
   */
  private calculateWidth(el: ScheduleElementModel): number {
    return (moment.duration(this.spendTime(el)).asHours()) * ONE_HOUR;
  }

  /**
   * SpendTime
   * @param {ScheduleElementModel} el
   * @returns {string}
   *
   * @description
   * represent how many time spend between to time variable
   */
  public spendTime(el: ScheduleElementModel): string {
    return timeInterval(el.start, el.end);
  }

  /**
   * DrawActivity
   * @param {CanvasRenderingContext2D} ctx
   *
   * @description
   * Draw activity on day
   */
  private drawActivity(ctx: CanvasRenderingContext2D) {
    this.schedule.elements
      .forEach((el: ScheduleElementModel) => {
        let x;
        x = moment.duration(el.start).asHours() * ONE_HOUR;

        ctx.fillStyle = COLOR[el.type];
        const w = this.calculateWidth(el);
        ctx.fillRect(
          x + this.xOffset, 150, w, 50
        );
      });
  }

  /**
   * Draw Label of Schedule
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} type
   */
  private drawLabel(ctx: CanvasRenderingContext2D, type: string = 'Schedule') {
    ctx.fillStyle = 'black';
    ctx.font = '20px Roboto';
    ctx.textAlign = 'left';
    const text = `${type} Schedule`;
    ctx.fillText(text, 20, 20);
  }

  /**
   * Draw hour label
   * @param {CanvasRenderingContext2D} ctx
   */
  private drawHourLabel(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i <= CANVAS_WIDTH; i += ONE_HOUR) {
      const x = i;
      ctx.fillStyle = 'black';
      ctx.font = '20px Roboto';
      ctx.textAlign = 'center';
      const time = moment(i / ONE_HOUR, 'HH').format('HH:mm');
      ctx.fillText(time, x + this.xOffset, 80);
    }
  }

  /**
   * DrawLineSeparator
   * @param {CanvasRenderingContext2D} ctx
   *
   * @description
   * Draw line separator for each 15 minutes, 30 minutes, 1 hour
   */
  private drawLineSeparator(ctx: CanvasRenderingContext2D) {
    const y = 200;
    for (let i = 0; i <= CANVAS_WIDTH; i += ONE_HOUR / 4) {
      const x = i;

      // Draw line each one hour
      if ((i % ONE_HOUR) === 0) {
        this.drawLine(ctx, {x, y, lineWidth: 3, lineHeight: 100});

        // Draw line each 30 minutes
      } else if ((i % (ONE_HOUR / 2)) === 0) {
        this.drawLine(ctx, {x, y, lineWidth: 2, lineHeight: 100});

        // Draw line each 15 minutes
      } else {
        this.drawLine(ctx, {x, y, lineWidth: 2, lineHeight: 80});
      }
    }
  }

  /**
   * Draw Line
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {number} lineWidth
   * @param {number} lineHeight
   */
  private drawLine(ctx: CanvasRenderingContext2D, {x, y, lineWidth, lineHeight}: DrawLineParams) {
    ctx.beginPath();
    ctx.moveTo(x + this.xOffset, y - lineHeight);
    ctx.lineTo(x + this.xOffset, y);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  /**
   * @description
   * RebuildScheduleData for better drawing
   * divide element sleep time to two separate element
   */
  private rebuildScheduleData() {
    // Find element by type
    const sleepElement = this.schedule.elements.find(element => element.type === 'sleep');
    // Remove sleep element
    this.schedule.elements = this.schedule.elements.filter(element => element.type !== 'sleep');

    // Divide sleep element to transform time
    this.schedule.elements.push(
      {
        type: 'sleep',
        start: sleepElement.start,
        end: '00:00',
      }
    );

    this.schedule.elements.push(
      {
        type: 'sleep',
        start: '00:00',
        end: sleepElement.end,
      }
    );
  }
}
