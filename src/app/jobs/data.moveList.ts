import {Move} from './move.data';

export class MoveList {
  index = 0;
  moveList: Move[] = [];

  constructor(input: any) {
    // this.moveList = [...input.result.workflows];

    // this.moveList = JSON.parse((JSON.stringify(input.result.workflows)));

    // for (const workflow of input.result.workflows) {
    // this.moveList.push(new Move(this.index, workflow));
    // this.index++;
    // }

    for (const workflow of input.workflows) {
      this.moveList.push(new Move(this.index, workflow));
      this.index++;
    }

  }
}



