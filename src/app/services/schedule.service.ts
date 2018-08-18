import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ScheduleDataInterface } from '../models/schedule.model';

/**
 * ScheduleService
 *
 * @description
 * Store scheduleData$ for letter usage
 *
 * @usage
 * this.this.scheduleService.scheduleData$.next(schedule)
 * this.this.scheduleService.scheduleData$.subscribe((schedule) => someFunction)
 */
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  public scheduleData$: Subject<ScheduleDataInterface>;
  constructor() {
    this.scheduleData$ = new Subject<ScheduleDataInterface>();
  }
}
