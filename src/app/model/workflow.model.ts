import {Base} from './base.model';
import {GripperGrip} from './gripper-grip.model';
import {GripperRelease} from './gripper-release.model';
import {BaseMove} from './base-move.model';
import {ArmTrajectory} from './arm-trajectory.model';
import {ArmJoint} from './arm-joint.model';
import {ArmCartesian} from './arm-cartesian.model';
/**
 * NewMethod must be imported
 */
import {NewMethod} from './new-method.model';
/**
 * This class is a model for a workflow.
 * This class contains all properties, methods to handle a worklow internally.
 * E.g. adding selected jobs to the workflow
 */
export class Workflow {
  /**
   * id of workflow
   */
    private _id: string;
  /**
   * name of workflow
   */
    private _name: string;
  /**
   * creation date of workflow ind DB (backend)
   */
    private _created_at: number;
  /**
   * containing jobs of workflow. Array of jobs in this workflow
   */
    private _jobsObjects: Base [];

  /**
   * constructor
   * @param {string} name The name of the workflow
   */
    constructor(name: string) {
      this._id = '0';
      this._name = name;
      this._created_at = Date.now();
      this._jobsObjects = [];
    }

  /**
   * adds all jobs in list to _jobsObjects including instancing the single jobs
   *
   * This methods is used in case of creating the workflow first time.
   * @param {string[]} jobsName An Array of the name of the selected jobs
   */
    addJobs(jobsName: string[]) {
      for (const jobName of jobsName) {
        switch (jobName) {
          /**
           * Here you have to add a new case for NewMethod
           */
          case 'NewMethodWorkflow': {
            this._jobsObjects.push(new NewMethod(jobsName));
            break;
          }
          case 'GripperGripWorkflow': {
            this._jobsObjects.push(new GripperGrip(jobsName));
            break;
          }
          case 'MoveArmOnTrajectoryWorkflow': {
            this._jobsObjects.push(new ArmTrajectory());
            break;
          }
          case 'MoveArmJointsWorkflow': {
            this._jobsObjects.push(new ArmJoint());
            break;
          }
          case 'MoveToPositionWorkflow': {
            this._jobsObjects.push(new BaseMove(jobsName));
            break;
          }
          case 'MoveArmCartesianWorkflow': {
            this._jobsObjects.push(new ArmCartesian(jobsName));
            break;
          }
          case 'GripperReleaseWorkflow': {
            this._jobsObjects.push(new GripperRelease(jobsName));
            break;
          }
          default: {
            this._jobsObjects.push(new BaseMove(jobsName));
            break;
          }
        }
      }
    }
  /**
   * Adds all jobs in list to _jobsObjects including instancing the single jobs
   *
   * This methods is used when receiving alredy stored workflow from backend
   * @param {string[]} jobsName An Array of the name of the selected jobs
   */
  addJobsFormWorkflow(job: any) {
      switch (job._name) {
        /**
         * Here you have to add a new case for NewMethod
         */
        case 'NewMethod': {
          this._jobsObjects.push(new NewMethod(job));
          break;
        }
        case 'GripperGrip': {
          console.log(job);
          this._jobsObjects.push(new GripperGrip(job));
          break;
        }
        case 'MoveArmOnTrajectoryWorkflow': {
          this._jobsObjects.push(new ArmTrajectory());
          break;
        }
        case 'MoveArmJointsWorkflow': {
          this._jobsObjects.push(new ArmJoint());
          break;
        }
        case 'MoveToPositionWorkflow': {
          this._jobsObjects.push(new BaseMove(job));
          break;
        }
        case 'ArmCartesian': {
          this._jobsObjects.push(new ArmCartesian(job));
          break;
        }
        case 'GripperRelease': {
          this._jobsObjects.push(new GripperRelease(job));
          break;
        }
        default: {
          this._jobsObjects.push(new BaseMove(job));
          break;
        }
    }
  }
  /**
   * Updates a jobs Object in the _jobsObjects array
   * @param {Base} jobs The updated job Object
   * @param {number} count The index in _jobsObjects
   */
    updateJobs(jobs: Base, count: number) {
      this._jobsObjects[count] = jobs;
    }
  /**
   * Getter for specific job Object in _jobsObjects array
   * @param {number} count The index in _jobsObjects
   * @returns The job object
   */
    getCurrentJob(count: number): Base {
      console.log(this._jobsObjects[count]);
      return this._jobsObjects[count];
    }
  /**
   * Getter for name of a specific job Object in _jobsObjects array
   * @param {number} count The index in _jobsObjects
   * @returns The job object's name
   */
    getJobName(count: number): string {
      return this._jobsObjects[count].name;
    }
  /**
   * Getter for _jobsObjects (all job objects) array
   * @returns The _jobObjects
   */
    getJobs(): Base [] {
      return this._jobsObjects;
    }
  /**
   * Getter for the length of _jobsObjects array
   * @returns The length of _jobObjects
   */
    getJobsLength(): number {
      return this._jobsObjects.length;
    }
  /**
   * Getter for the _name of the workflow
   * @returns The _name of the workflow
   */
    get name(): string {
      return this._name;
    }
  /**
   * Setter for the _name of the workflow
   * @param {string} value name of workflow
   */
    set name(value: string) {
      this._name = value;
    }
  /**
   * Getter for the _id of the workflow
   * @returns The _id of the workflow
   */
    get id(): string {
      return this._id;
    }
  /**
   * Setter for the _id of the workflow
   * @param {string} value _id of workflow
   */
    set id(value: string) {
      this._id = value;
    }
  /**
   * Getter for the _created_at of the workflow
   * @returns The creation date of the workflow
   */
    get created_at(): number {
      return this._created_at;
    }
  /**
   * Setter for the _created_at of the workflow
   * @param {string} value creation date of workflow
   */
    set created_at(value: number) {
      this._created_at = value;
    }
}

