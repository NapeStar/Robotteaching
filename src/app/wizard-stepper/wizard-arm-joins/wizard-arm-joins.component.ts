import {Component, OnDestroy, OnInit} from '@angular/core';
import {Job} from '../../jobs/job.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';

@Component({
  selector: 'app-wizard-arm-joins',
  templateUrl: './wizard-arm-joins.component.html',
  styleUrls: ['./wizard-arm-joins.component.css']
})
export class WizardArmJoinsComponent extends WizardJobComponent implements OnInit, OnDestroy {

  title = 'Arm Joins';

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

  counter: number;
  counterSub: Subscription;

  constructor(private router: Router,
              private wizardStepperService: WizardStepperService) {
    super();
  }

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

  ngOnDestroy() {
    this.jobsSub.unsubscribe();
    this.counterSub.unsubscribe();
  }

  onNextClick(): void {
    if (this.counter < this.jobsUpdated.length - 1 ) {
      this.wizardStepperService.increaseCount();
      this.selectNextJob(this.jobsUpdated[this.counter]);
      this.router.navigate([this.link]);
    } else {
      alert('no jobs selected');
    }
    console.log(this.jobsUpdated.length);
    console.log(this.counter);
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
    console.log(this.jobsUpdated.length);
    console.log(this.counter);
  }
}
