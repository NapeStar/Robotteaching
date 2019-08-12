import {Base} from './base.model';

export class ArmJoint extends Base {

  private _jointValues: number[];

  constructor() {
    super('ArmJoint');
    this._jointValues = [0, 0, 0, 0];
  }

  get jointValues(): number[] {
    return this._jointValues;
  }

  set jointValues(value: number[]) {
    this._jointValues = value;
  }
}
