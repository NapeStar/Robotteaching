import {Base} from './base.model';
/**
 * This class/model extends Base
 *
 * This class has to be adjusted - mistakes in provided API
 */
export class ArmJoint extends Base {
  /**
   * to stores _jointVales according to API
   */
  private _jointValues: number[];
  /**
   * constructor calls constructor of Base
   *
   * default constructor has to be adjusted
   */
  constructor() {
    super('ArmJoint');
    this._jointValues = [0, 0, 0, 0];
  }
  /**
   * Getter for _jointValues
   * @returns The _jointValues
   */
  get jointValues(): number[] {
    return this._jointValues;
  }
  /**
   * Setter for _jointValues
   * @param {number} value Set _jointValues
   */
  set jointValues(value: number[]) {
    this._jointValues = value;
  }
}
