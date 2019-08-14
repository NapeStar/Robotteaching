import {Component, OnDestroy, OnInit} from '@angular/core';
import {Job} from '../../jobs/job.model';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {Subject, Subscription} from 'rxjs';
import {Workflow} from '../../model/workflow.model';

@Component({
  selector: 'app-wizard-job',
  templateUrl: './wizard-job.component.html',
  styleUrls: ['./wizard-job.component.css']
})
export class WizardJobComponent implements OnInit, OnDestroy {

  link = 'wizard/';

  workflow: Workflow;
  private workflowSub: Subscription;

  jobsUpdated: Job[] = [];
  private jobsSub: Subscription;

  counter: number;
  private counterSub: Subscription;


  constructor(protected router: Router,
              protected wizardStepperService: WizardStepperService) { }

  ngOnInit() {
    this.jobsSub = this.wizardStepperService.getJobsListener()
      .subscribe(jobsUpdated => {
        this.jobsUpdated = jobsUpdated;
      });
    this.counterSub = this.wizardStepperService.getCounterListener()
      .subscribe(counter => {
        this.counter = counter;
      });
    this.workflowSub = this.wizardStepperService.getWorkflowListener()
      .subscribe(workflow => {
        this.workflow = workflow;
      });
    this.workflow = this.wizardStepperService.getWorkflow();
    this.jobsUpdated = this.wizardStepperService.getJobs();
    this.counter = this.wizardStepperService.getCounter();
    console.log(this.counter);
    console.log(this.workflow);
  }

  onNextClick(): void {
    if (this.counter < this.jobsUpdated.length - 1) {
      this.wizardStepperService.increaseCount();
      this.selectNextJob(this.jobsUpdated[this.counter]);
      this.router.navigate([this.link]);
    } else if (this.counter === this.jobsUpdated.length) {
      this.wizardStepperService.updateCount(this.counter = 0);
      this.link += 'run';
      this.router.navigate([this.link]);
    }
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
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe();
    this.counterSub.unsubscribe();
    this.workflowSub.unsubscribe();
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