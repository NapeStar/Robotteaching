import {Base} from './base.model';
/**
 * This class/model extends Base
 *
 * It contains all parameters and methods for ArmCartesian
 */
export class ArmCartesian extends Base {
  /**
   * to stores cartesian coordinates
   */
  private _goalPose: number [];
  /**
   * constructor calls constructor of Base
   *
   * if id and activationTimout is not passed, default values are used.
   * @param {any} data
   */
  constructor(data: any) {
    super('ArmCartesian');
    this.id = data._id;
    this.activationTimeout = data._activationTimeout;
    this._goalPose = data._goalPose;
    this.id = (typeof this.id === 'undefined') ? 0 : this.id ;
    this.activationTimeout = (typeof this.activationTimeout === 'undefined') ? 50 : this.activationTimeout;
    console.log(this._goalPose);
  }
  /**
   * Setter for _goalPose
   * @param {number} value Set cartesian coordinates
   */
  set goalPose(value: number[]) {
    this._goalPose = value;
  }
  /**
   * Getter for _goalPose
   * @returns The _goalPose
   */
  get goalPose(): number[] {
    return this._goalPose;
  }
}
