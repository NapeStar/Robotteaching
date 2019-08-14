import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WizardStepperService} from '../wizard-stepper/wizard-stepper.service';
import {Workflow} from '../model/workflow.model';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {



  workflow: Workflow;
  private workflowSub: Subscription;

  constructor(private http: HttpClient, protected wizardStepperService: WizardStepperService) {
    this.workflowSub = this.wizardStepperService.getWorkflowListener()
      .subscribe(workflow => {
        this.workflow = workflow;
      });
    this.workflow = this.wizardStepperService.getWorkflow();
  }

sendWorkflow() {
    this.http.post('http://localhost:3000/saveWorkflow', {jsondata: this.workflow});
}
}
