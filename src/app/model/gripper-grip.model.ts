import {Base} from './base.model';
/**
 * This class/model extends Base
 *
 * It contains all parameters and methods for GripperGrip
 */
export class GripperGrip extends Base {
  /**
   * constructor calls constructor of Base
   *
   * if id and activationTimout is not passed, default values are used.
   * @param {any} data
   */
  constructor(data: any) {
    super('GripperGrip');
    this.id = data._id;
    this.activationTimeout = data._activationTimeout;
    this.id = (typeof this.id === 'undefined') ? 0 : this.id ;
    this.activationTimeout = (typeof this.activationTimeout === 'undefined') ? 50 : this.activationTimeout;
  }
}


