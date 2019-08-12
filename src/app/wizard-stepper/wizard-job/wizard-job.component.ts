import { Component, OnInit } from '@angular/core';
import {Job} from '../../jobs/job.model';

@Component({
  selector: 'app-wizard-job',
  templateUrl: './wizard-job.component.html',
  styleUrls: ['./wizard-job.component.css']
})
export class WizardJobComponent implements OnInit {

  link = 'wizard/';

  constructor() { }

  ngOnInit() {
  }

  selectNextJob(job: Job) {
    this.link = 'wizard/';
    switch (job.id) {
      case 0: {
        this.link += 'gripper_grip';
        break;
      }
      case 1: {
        this.link += 'arm_trajectory';
        break;
      }
      case 2: {
        this.link += 'arm_trajectory';
        break;
      }
      case 3: {
        this.link += 'arm_joints';
        break;
      }
      case 4: {
        this.link += 'base';
        break;
      }
      case 5: {
        this.link += 'arm_cartesian';
        break;
      }
      case 6: {
        this.link += 'gripper_release';
        break;
      }
      default: {
        break;
      }
    }
    console.log(this.link);
  }



}
