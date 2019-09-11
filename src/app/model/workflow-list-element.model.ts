
export class WorkflowListElement {

  private _id: string;
  private _name: string;
  private _created_at: number;


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get created_at(): number {
    return this._created_at;
  }

  set created_at(value: number) {
    this._created_at = value;
  }
}

