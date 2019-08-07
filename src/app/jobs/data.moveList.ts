import {Move} from './move.data';

export class MoveList {
  index = 0;
  moveList: Move[] = [];

  constructor(input: any) {

    for (const workflow of input.result.workflows) {
    this.moveList.push(new Move(this.index, workflow));
    this.index++;
    }

  }
}



