import {Base} from './base.model';
import {Job} from '../jobs/job.model';
import {GripperGrip} from './gripper-grip.model';
import {GripperRelease} from './gripper-release.model';
import {BaseMove} from './base-move.model';
import {ArmTrajectory} from './arm-trajectory.model';
import {ArmJoint} from './arm-joint.model';
import {ArmCartesian} from './arm-cartesian.model';

export class Workflow {
    private _id: string;
    private _name: string;
    private _created_at: number;
    private _jobsObjects: Base [];

    constructor(name: string) {
      this._id = '0';
      this._name = name;
      this._created_at = Date.now();
      this._jobsObjects = [];
    }


    addJobs(jobsName: string[]) {
      for (const jobName of jobsName) {
        switch (jobName) {
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
            this._jobsObjects.push(new BaseMove());
            break;
          }
          case 'MoveArmCartesianWorkflow': {
            this._jobsObjects.push(new ArmCartesian());
            break;
          }
          case 'GripperReleaseWorkflow': {
            this._jobsObjects.push(new GripperRelease(jobsName));
            break;
          }
          default: {
            this._jobsObjects.push(new BaseMove());
            break;
          }
        }
      }
    }
  addJobsFormWorkflow(job: any) {
      switch (job._name) {
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
          this._jobsObjects.push(new BaseMove());
          break;
        }
        case 'MoveArmCartesianWorkflow': {
          this._jobsObjects.push(new ArmCartesian());
          break;
        }
        case 'GripperRelease': {
          this._jobsObjects.push(new GripperRelease(job));
          break;
        }
        default: {
          this._jobsObjects.push(new BaseMove());
          break;
        }
    }
  }

    updateJobs(jobs: Base, count: number) {
      this._jobsObjects[count] = jobs;
    }
    getCurrentJob(count: number): Base {
      console.log(this._jobsObjects[count]);
      return this._jobsObjects[count];
    }
    getJobName(count: number): string {
      return this._jobsObjects[count].name;
    }

    getJobs(): Base [] {
      return this._jobsObjects;
    }
    getJobsLength(): number {
      return this._jobsObjects.length;
    }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
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

