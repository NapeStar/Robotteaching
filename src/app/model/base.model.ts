export abstract class Base {
  private _id: number;
  private _name: string;
  private _activationTimeout: number;


  constructor(name: string) {
    this._id = 0;
    this._activationTimeout = 0;
    this._name = name;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get activationTimeout(): number {
    return this._activationTimeout;
  }

  set activationTimeout(value: number) {
    this._activationTimeout = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
