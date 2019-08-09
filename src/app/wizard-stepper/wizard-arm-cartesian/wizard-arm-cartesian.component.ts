import {Component, OnDestroy, OnInit} from '@angular/core';
import {Job} from '../../jobs/job.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';

@Component({
  selector: 'app-wizard-arm-cartesian',
  templateUrl: './wizard-arm-cartesian.component.html',
  styleUrls: ['./wizard-arm-cartesian.component.css']
})
export class WizardArmCartesianComponent implements OnInit,  OnDestroy {

  title = 'Arm Cartesian';

  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 50;
  vertical = false;

  jobs: Job[] = [];
  jobsUpdated: Job[] = [];
  private jobsSub: Subscription;
  link = 'wizard/';

  constructor(private router: Router,
              private wizardStepperService: WizardStepperService) {
  }

  ngOnInit() {
    this.jobsSub = this.wizardStepperService.getJobs()
      .subscribe(jobsUpdated => {
        this.jobsUpdated = jobsUpdated;
      });
    this.jobsUpdated = this.wizardStepperService.getJobs2();
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe();
  }

  onNextClick(): void {
    if (this.jobsUpdated.length > 0) {
      this.selectNextJob(this.jobsUpdated.reverse().pop());
      this.jobsUpdated.reverse();
      this.wizardStepperService.updateJob(this.jobsUpdated);
      this.router.navigate([this.link]);
    } else {
      alert('no jobs selected');
    }
    console.log(this.jobsUpdated.length);
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
