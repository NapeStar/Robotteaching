import {Base} from './base.model';

export class ArmCartesian extends Base {
  private _goalPose: number [];

  constructor() {
    super('ArmCartesian');
    this._goalPose = [0, 0, 0, 0, 0, 0, 0];
  }

  set goalPose(value: number[]) {
    this._goalPose = value;
  }

  get goalPose(): number[] {
    return this._goalPose;
  }
}
