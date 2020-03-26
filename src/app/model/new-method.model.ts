import {Base} from './base.model';
/**
 * The new class/model must extend Base!
 *
 * All other parameters and methods can be changed for NewMethod
 */
export class NewMethod extends Base {
  /**
   * only example - has be adjusted to NewMethod
   */
  private _goalPose: number [];
  /**
   * constructor calls constructor of Base
   *
   * only example - has to be adjusted to NewMethod
   * @param {any} data
   */
  constructor(data: any) {
    super('NewMethod');
    this.id = data._id;
    this.activationTimeout = data._activationTimeout;
    this._goalPose = data._goalPose;
    this.id = (typeof this.id === 'undefined') ? 0 : this.id ;
    this.activationTimeout = (typeof this.activationTimeout === 'undefined') ? 50 : this.activationTimeout;
    console.log(this._goalPose);
  }
  /**
   * Setter for e.g. _goalPose - has be adjusted to NewMethod
   * @param {number} value
   */
  set goalPose(value: number[]) {
    this._goalPose = value;
  }
  /**
   * Getter for e.g. _goalPose - has be adjusted to NewMethod
   * @returns The _goalPose
   */
  get goalPose(): number[] {
    return this._goalPose;
  }
}
