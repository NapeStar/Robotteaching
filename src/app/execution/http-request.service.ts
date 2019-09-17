import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Workflow} from '../model/workflow.model';
import {WizardStepperService} from '../wizard-stepper/wizard-stepper.service';
import {Observable, Subscription} from 'rxjs';
import { Subject } from 'rxjs';
import {WorkflowListElement} from '../model/workflow-list-element.model';
import {map} from 'rxjs/operators';
import {Move} from '../jobs/move.data';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {


  workflowList: WorkflowListElement[] = [];
  private workflowListSub = new Subject<WorkflowListElement[]>();
  workflow: Workflow;
  private workflowSub: Subscription;
  // private workflowSub = new Subject<Workflow>();

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
  updateWorkflow(workflow: Workflow) {
    this.http.post('http://localhost:3000/updateWorkflow', {jsondata: workflow}).subscribe(
      (responseData) => {
        console.log(responseData);
        this.workflow.id = responseData + '';
        this.wizardStepperService.updateWorkflow(this.workflow);
      });
  }
  getAllWorkflows() {
    this.http.post<WorkflowListElement[]>('http://localhost:3000/readWorkflow/readAll', null).subscribe(
      (responseData) => {
        this.workflowList = responseData;
        this.workflowListSub.next([...this.workflowList]);
        console.log(responseData);
        console.log(this.workflowList);
      });
  }
  getWorkflowListUpdateListener() {
    return this.workflowListSub.asObservable();
  }
  deleteWorkflow() {

  }
  // Observable<number[]>

  getArmPosition() {
    return this.http.post('http://localhost:3000/RobotDataService/getBasePosition', null);
      // .pipe(map(data => {}));
  }
  getBasePosition() {
    return this.http.post('http://localhost:3000/RobotDataService/getBasePosition', null);
    // this.http.post<WorkflowListElement[]>('http://localhost:3000/RobotDataService/getBasePosition', null)
    //   .subscribe(
    //   (responseData) => {
    //     console.log(responseData);
    //   });
  }
  getWorkflow(id: number) {
    return this.http.post('http://localhost:3000/readWorkflow/readOne', {wf_id: id});
  }
}
