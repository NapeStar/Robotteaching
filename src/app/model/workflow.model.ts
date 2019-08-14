import {Base} from './base.model';
import {Job} from '../jobs/job.model';
import {GripperGrip} from './gripper-grip.model';
import {GripperRelease} from './gripper-release.model';
import {BaseMove} from './base-move.model';
import {ArmTrajectory} from './arm-trajectory.model';
import {ArmJoint} from './arm-joint.model';

export class Workflow {
    private _id: string;
    private _created_at: number;
    private _jobsObjects: Base [];

    constructor() {
      this._id = '0';
      this._created_at = 0;
      this._jobsObjects = [];
    }

    addJobs(jobsName: Job[]) {
      for (const jobName of jobsName) {
        switch (jobName.id) {
          case 0: {
            this._jobsObjects.push(new GripperGrip());
            break;
          }
          case 1: {
            this._jobsObjects.push(new ArmTrajectory());
            break;
          }
          case 3: {
            this._jobsObjects.push(new ArmJoint());
            break;
          }
          case 4: {
            this._jobsObjects.push(new BaseMove());
            break;
          }
          case 5: {
            this._jobsObjects.push(new ArmTrajectory());
            break;
          }
          case 6: {
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

