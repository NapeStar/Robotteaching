/**
 * This class/model is the abstract parent class of all Job models
 *
 * It contains the parameters each method has a least
 */
export abstract class Base {
  /**
   * id will be sent from backend
   */
  private _id: number;
  /**
   * name of method/job
   */
  private _name: string;
  /**
   * according to API each method/job has activationTimeout
   */
  private _activationTimeout: number;

  /**
   * constructor with default values for _id and _activationTimeout
   * @param {string} name The name of the method
   */
  constructor(name: string) {
    this._id = 0;
    this._activationTimeout = 50;
    this._name = name;
  }
  /**
   * Getter for _id
   * @returns The _id
   */
  get id(): number {
    return this._id;
  }
  /**
   * Setter for _id
   * @param {number} value Set ID
   */
  set id(value: number) {
    this._id = value;
  }
  /**
   * Getter for _activationTimeout
   * @returns The _activationTimeout
   */
  get activationTimeout(): number {
    return this._activationTimeout;
  }
  /**
   * Setter for _activationTimeout
   * @param {number} value Set _activationTimeout
   */
  set activationTimeout(value: number) {
    this._activationTimeout = value;
  }
  /**
   * Getter for _name
   * @returns The _name
   */
  get name(): string {
    return this._name;
  }
  /**
   * Setter for _name
   * @param {number} value Set _name
   */
  set name(value: string) {
    this._name = value;
  }
}
