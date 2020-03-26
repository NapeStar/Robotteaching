/**
 * This class is only used for
 * Drag&Drop from Angular Material {@link https://material.angular.io/cdk/drag-drop/overview}
 */
export class Move {
  /**
   * id -> index 1 to number of methods
   */
  id: number;
  /**
   * name of displayed methods for Drag&Drop
   */
  name: string;
  /**
   * constructor
   * @param {number} id ID
   * @param {any} workflow The displayed name of Methods
   */
  constructor(id: number, workflow: any) {
    this.id = id;
    this.name = workflow;
  }

}
