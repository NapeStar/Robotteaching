import {Base} from './base.model';

export class ArmCartesian extends Base {
  private _goalPose: number [];

  constructor(data: any) {
    super('ArmCartesian');
    this.id = data._id;
    this.activationTimeout = data._activationTimeout;
    this._goalPose = data._goalPose;
    // console.log(data);
    // console.log(this.id);
    this.id = (typeof this.id === 'undefined') ? 0 : this.id ;
    this.activationTimeout = (typeof this.activationTimeout === 'undefined') ? 50 : this.activationTimeout;
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
