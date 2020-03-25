import {Base} from './base.model';

export class BaseMove extends Base {
  private _goalPose: number [];

  constructor(data: any) {
    super('BaseMove');
    this.id = data._id;
    this.activationTimeout = data._activationTimeout;
    this._goalPose = data._goalPose;
    this.id = (typeof this.id === 'undefined') ? 0 : this.id ;
    this.activationTimeout = (typeof this.activationTimeout === 'undefined') ? 50 : this.activationTimeout;
    console.log(this._goalPose);
  }

  set goalPose(value: number[]) {
    this._goalPose = value;
  }

  get goalPose(): number[] {
    return this._goalPose;
  }
}
