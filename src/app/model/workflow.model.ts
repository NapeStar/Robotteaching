import {Base} from './base.model';
import {Job} from '../jobs/job.model';
import {GripperGrip} from './gripper-grip.model';
import {GripperRelease} from './gripper-release.model';
import {BaseMove} from './base-move.model';
import {ArmTrajectory} from './arm-trajectory.model';
import {ArmJoint} from './arm-joint.model';

export class Workflow {
    private _id: string;
    private _name: string;
    private _created_at: number;
    private _jobsObjects: Base [];

    constructor() {
      this._id = '0';
      this._name = 'no name';
      this._created_at = Date.now();
      this._jobsObjects = [];
    }

    addJobs(jobsName: string[]) {
      for (const jobName of jobsName) {
        switch (jobName) {
          case 'GripperGripWorkflow': {
            this._jobsObjects.push(new GripperGrip());
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
            this._jobsObjects.push(new BaseMove());
            break;
          }
          case 'MoveArmCartesianWorkflow': {
            this._jobsObjects.push(new ArmTrajectory());
            break;
          }
          case 'GripperReleaseWorkflow': {
            this._jobsObjects.push(new GripperRelease());
            break;
          }
          default: {
            this._jobsObjects.push(new BaseMove());
            break;
          }
        }
      }
    }
    updateJobs(jobs: Base, count: number) {
      this._jobsObjects[count] = jobs;
    }
    getCurrentJob(count: number): Base {
      return this._jobsObjects[count];
    }
    getJobs(): Base [] {
      return this._jobsObjects;
    }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get created_at(): number {
    return this._created_at;
  }

  set created_at(value: number) {
    this._created_at = value;
  }
}

