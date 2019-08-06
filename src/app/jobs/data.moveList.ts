import {Move} from './move.data';

export class MoveList {

  moveList: Move[] = [];

  constructor(input: any) {
    for (const workflow of input.result.workflows) {
    this.moveList.push(new Move(workflow));
    }

  }
}



