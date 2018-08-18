import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ScheduleModel, scheduleType} from '../models/schedule.model';
import {ScheduleService} from '../services/schedule.service';

/**
 * ScheduleFormComponent
 *
 * @description
 * Create a form with question about work day Schedule
 *
 * @usage
 * <dev-challenge-schedule-form [type]="'regular'"></dev-challenge-schedule-form>
 */
@Component({
  selector: 'dev-challenge-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {
  // Type of Schedule (regular or optimized)
  @Input('type')
  public type: scheduleType;
  public scheduleForm: FormGroup;

  constructor(private fb: FormBuilder,
              private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.buildScheduleForm();
  }

  /**
   * BuildInitialGroup
   * @param {string} start
   * @param {string} end
   * @returns {FormGroup}
   *
   * @description
   * Build initial group of Schedule
   */
  private buildInitialGroup(start: string = null, end: string = null) {
    return this.fb.group({
      start: [start, [Validators.required]],
      end: [end, [Validators.required]]
    });
  }

  /**
   * @description
   * Create Schedule Form
   */
  private buildScheduleForm() {
    this.scheduleForm = this.fb.group({
      work: this.buildInitialGroup(),
      commute: this.buildInitialGroup(),
      sleep: this.buildInitialGroup(),
      lunch: this.buildInitialGroup(),
      home: this.buildInitialGroup()
    });
  }

  /**
   * SubmitScheduleForm
   *
   * @description
   * Submit Schedule Form. Create new Schedule and pass that data to ScheduleService
   */
  public submitScheduleForm() {
    const schedule = new ScheduleModel(this.scheduleForm.value);
    this.scheduleService.scheduleData$.next({type: this.type, payload: schedule});
  }

}
