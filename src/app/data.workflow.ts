export class Workflow {


  static fromJSON(data: any) {
    return Object.assign(new this, data);
  }



}
