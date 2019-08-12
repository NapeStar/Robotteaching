import {Component, OnDestroy, OnInit} from '@angular/core';
import {Job} from '../../jobs/job.model';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-wizard-job',
  templateUrl: './wizard-job.component.html',
  styleUrls: ['./wizard-job.component.css']
})
export class WizardJobComponent implements OnInit, OnDestroy {

  link = 'wizard/';

  jobsUpdated: Job[] = [];
  private jobsSub: Subscription;

  counter: number;
  counterSub: Subscription;


  constructor(private router: Router,
              private wizardStepperService: WizardStepperService) { }

  ngOnInit() {
    this.jobsSub = this.wizardStepperService.getJobsListener()
      .subscribe(jobsUpdated => {
        this.jobsUpdated = jobsUpdated;
      });
    this.counterSub = this.wizardStepperService.getCounterListener()
      .subscribe(counter => {
        this.counter = counter;
      });
    this.jobsUpdated = this.wizardStepperService.getJobs2();
    this.counter = this.wizardStepperService.getCounter();
    console.log(this.counter);
  }

  onNextClick(): void {
    if (this.counter < this.jobsUpdated.length - 1) {
      this.wizardStepperService.increaseCount();
      this.selectNextJob(this.jobsUpdated[this.counter]);
      this.router.navigate([this.link]);
    } else {
      alert('no jobs selected');
    }
    // console.log(this.jobsUpdated.length);
    // console.log(this.counter);
  }

  onPreviousClick(): void {
    this.wizardStepperService.decreaseCount();
    if (this.counter >= 0) {
      this.selectNextJob(this.jobsUpdated[this.counter]);
      this.router.navigate([this.link]);
    } else {
      this.link = 'jobs';
      this.router.navigate([this.link]);
    }
    // console.log(this.jobsUpdated.length);
    // console.log(this.counter);
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe();
    this.counterSub.unsubscribe();
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
