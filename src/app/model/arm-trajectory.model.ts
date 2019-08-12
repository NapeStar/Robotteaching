import {Base} from './base.model';

export class ArmTrajectory extends Base {

  private _timeout: number;

  constructor() {
    super('ArmTrajecory');
    this._timeout = 0;
  }

  get timeout(): number {
    return this._timeout;
  }

  set timeout(value: number) {
    this._timeout = value;
  }
}
