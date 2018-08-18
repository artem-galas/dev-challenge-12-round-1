import {Component, OnInit} from '@angular/core';
import {ScheduleService} from './services/schedule.service';
import {ScheduleModel} from './models/schedule.model';

/**
 * AppComponent
 *
 * @description
 * Main component on application
 * Show the ScheduleForm and ChartComponent
 */
@Component({
  selector: 'dev-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public regularSchedule: ScheduleModel;
  public optimizedSchedule: ScheduleModel;
  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    // Subscribe to scheduleData$ changes
    this.scheduleService
      .scheduleData$
      .subscribe((scheduleData) => {
        // Store data from subject to necessary variable
        if (scheduleData.type === 'regular') {
          this.regularSchedule = scheduleData.payload;
        } else {
          this.optimizedSchedule = scheduleData.payload;
        }
      });
  }

  /**
   * ClearAll
   *
   * @description
   * Clear all information about Schedule
   */
  public clearAll() {
    this.regularSchedule = null;
    this.optimizedSchedule = null;
  }
}
