/**
 * Type representing a ScheduleElementType for ScheduleElementModel
 */
export type scheduleElementType =
  'work' |
  'lunch' |
  'sleep' |
  'commute' |
  'home';

/**
 * Type representing a ScheduleModelParams for constructor
 */
type scheduleModelParams = {
  [key in scheduleElementType]: {
    start: string;
    end: string
  }
};

export type scheduleType =
  'regular' |
  'optimize';

/**
 * Class ScheduleElementModel representing a ScheduleElement using in Schedule
 */
export class ScheduleElementModel {
  type: scheduleElementType;
  start: string;
  end: string;
}

/**
 * Class ScheduleModel representing a Schedule.
 */
export class ScheduleModel {
  elements: ScheduleElementModel[];

  /**
   * Create ScheduleModel
   * @param {scheduleModelParams} params
   */
  constructor(params: scheduleModelParams) {
    this.elements = [];
    Object.keys(params)
      .forEach((key: scheduleElementType) => {
        this.elements.push(
          {
            type: key,
            start: params[key].start,
            end: params[key].end
          });
      });
  }
}

export interface ScheduleDataInterface {
  type: scheduleType;
  payload: ScheduleModel;
}
