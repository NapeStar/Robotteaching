import {Base} from './base.model';

export class BaseMove extends Base {
  private _goalPose: number [];

  constructor() {
    super('BaseMove');
    // this._goalPose = [0, 0, 0, 0, 0, 0, 0];
    console.log(this._goalPose);
  }

  set goalPose(value: number[]) {
    this._goalPose = value;
  }

  get goalPose(): number[] {
    return this._goalPose;
  }
}
