import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Workflow} from '../model/workflow.model';
import {WizardStepperService} from '../wizard-stepper/wizard-stepper.service';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  workflow: Workflow;
  private workflowSub: Subscription;

  constructor(private http: HttpClient,
              private wizardStepperService: WizardStepperService) {
    this.workflowSub = this.wizardStepperService.getWorkflowListener()
      .subscribe(workflow => {
        this.workflow = workflow;
      });
    this.workflow = this.wizardStepperService.getWorkflow();
  }
  saveWorkflow(workflow: Workflow) {
    this.http.post('http://localhost:3000/saveWorkflow', {jsondata: workflow}).subscribe(
      (responseData) => {
        console.log(responseData);
        this.workflow.id = responseData + '';
        this.wizardStepperService.updateWorkflow(this.workflow);
      });
  }

  createWorkflow(workflow: Workflow) {
    this.http.post('http://localhost:3000/createWorkflow', {jsondata: workflow}).subscribe(
      (responseData) => {
        console.log(responseData);
        this.workflow.id = responseData + '';
        this.wizardStepperService.updateWorkflow(this.workflow);
      });
  }
  runWorkflow() {
    this.http.post('http://localhost:3000/playWorkflow', {wf_id: this.workflow.id}).subscribe(
      (responseData) => {
        console.log(responseData);
      });
  }
  getAllWorkflows() {
    this.http.post('http://localhost:3000/readWorkflow/readAll', null).subscribe(
      (responseData) => {
        console.log(responseData);
      });

  }

}
