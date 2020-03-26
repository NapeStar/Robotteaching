import {Base} from './base.model';
/**
 * This class/model extends Base
 *
 * This class has to be adjusted - mistakes in provided API
 */
export class ArmTrajectory extends Base {
  /**
   * to stores _timeout according to API
   */
  private _timeout: number;
  /**
   * constructor calls constructor of Base
   *
   * default constructor has to be adjusted
   */
  constructor() {
    super('ArmTrajecory');
    this._timeout = 0;
  }
  /**
   * Getter for _timeout
   * @returns The _timeout
   */
  get timeout(): number {
    return this._timeout;
  }
  /**
   * Setter for _timeout
   * @param {number} value Set _timeout
   */
  set timeout(value: number) {
    this._timeout = value;
  }
}
