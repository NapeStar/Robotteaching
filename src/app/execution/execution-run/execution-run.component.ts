import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobsService} from '../../jobs/jobs.service';
import {Router} from '@angular/router';
import {WizardStepperService} from '../../wizard-stepper/wizard-stepper.service';
import {WizardJobComponent} from '../../wizard-stepper/wizard-job/wizard-job.component';
import {Workflow} from '../../model/workflow.model';
import {Subscription} from 'rxjs';
import {Job} from '../../jobs/job.model';
import {HttpRequestService} from '../http-request.service';
import {HttpClient} from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
import {WizardParentStepperService} from '../../wizard-stepper/wizard-parent/wizard-parent-stepper.service';

@Component({
  selector: 'app-execution-run',
  templateUrl: './execution-run.component.html',
  styleUrls: ['./execution-run.component.css']
})
export class ExecutionRunComponent extends WizardJobComponent implements OnInit, OnDestroy {

  isDisabledRun = true;

  constructor(protected router: Router,
              protected wizardStepperService: WizardStepperService,
              private http: HttpClient,
              private httpRequest: HttpRequestService,
              protected eventEmitterService: WizardParentStepperService) {
    super(router, wizardStepperService, eventEmitterService);
  }

  ngOnInit() {
  super.ngOnInit();
  }

  runOnClick() {
    this.httpRequest.createWorkflow(this.workflow);
    setTimeout (() => {
      this.httpRequest.runWorkflow();
      this.eventEmitterService.onStepperNextClick();
      console.log('Next wurde ausgeführt');
      console.log('Hello from setTimeout');
    }, 5000);

    // this.httpRequest.runWorkflow();
    // this.eventEmitterService.onStepperNextClick();
    // console.log('Next wurde ausgeführt');
  }

  saveOnClick() {
    // this.httpRequest.saveWorkflow(this.workflow);
    this.eventEmitterService.onStepperNextClick();
    this.isDisabledRun = false;
    console.log('Next wurde ausgeführt');
  }
  backOnClick() {
    this.eventEmitterService.onStepperBackClick();
    this.selectNextJob(this.jobsUpdated[this.counter]);
    this.router.navigate([this.link]);
    console.log('Back wurde ausgeführt');
  }
}
