import {Base} from './base.model';

export class GripperGrip extends Base {
  constructor(data: any) {
    super('GripperGrip');
    this.id = data._id;
    this.activationTimeout = data._activationTimeout;
    this.id = (typeof this.id === 'undefined') ? 0 : this.id ;
    this.activationTimeout = (typeof this.activationTimeout === 'undefined') ? 50 : this.activationTimeout;
  }
}


