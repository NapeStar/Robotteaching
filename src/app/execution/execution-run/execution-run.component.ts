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

@Component({
  selector: 'app-execution-run',
  templateUrl: './execution-run.component.html',
  styleUrls: ['./execution-run.component.css']
})
export class ExecutionRunComponent extends WizardJobComponent implements OnInit, OnDestroy {

  constructor(protected router: Router,
              protected wizardStepperService: WizardStepperService,
              private http: HttpClient,
              private httpRequest: HttpRequestService) {
    super(router, wizardStepperService);
  }

  ngOnInit() {
  super.ngOnInit();
  }

  runOnClick() {
    this.httpRequest.runWorkflow();
  }

  saveOnClick() {
    this.httpRequest.saveWorkflow(this.workflow);
  }
}
