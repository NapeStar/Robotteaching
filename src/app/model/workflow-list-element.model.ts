/**
 * This class is needed especially for workflow-table component.
 * It represents one entry (WorkflowListElement) in the presented workflow table.
 * This class contains all properties, methods to handle a worklow internally.
 */
export class WorkflowListElement {
  /**
   * id of the worktable entry
   */
  public _id: string;
  /**
   * name of the worktable entry
   */
  public _name: string;
  /**
   * creation date of one worktable entry
   */
  public _created_at: number;
  /**
   * default constructor
   */
  constructor() {
  }
}

