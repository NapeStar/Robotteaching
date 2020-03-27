import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Workflow} from '../model/workflow.model';
import {WizardStepperService} from '../wizard-stepper/wizard-stepper.service';
import {Subscription} from 'rxjs';
import {Subject} from 'rxjs';
import {WorkflowListElement} from '../model/workflow-list-element.model';
/**
 * this service provides the communication with backend.
 * The communication for all CRUD (CREATE, READ, UPDATE, DELETE) + Execute(Run) operations are provided.
 * The communication with backend is via HTTP
 */
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  /**
   * local array of all Workflows presented in Workflow table
   */
  workflowList: WorkflowListElement[] = [];
  /**
   * Subscription for observed workflowListSub -> synchronized and shared WorkflowListElement Array
   */
  private workflowListSub = new Subject<WorkflowListElement[]>();
  /**
   * locally stored workflow
   */
  workflow: Workflow;
  /**
   * Subscription for observed workflowSub -> synchronized and shared workflow
   */
  private workflowSub: Subscription;
  /**
   * constructor
   * @param {HttpClient} http Service for for communication with backend
   * @param {WizardStepperService} wizardStepperService Service for sharing workflow information
   */
  constructor(private http: HttpClient,
              private wizardStepperService: WizardStepperService) {
    this.workflowSub = this.wizardStepperService.getWorkflowListener()
      .subscribe(workflow => {
        this.workflow = workflow;
      });
    this.workflow = this.wizardStepperService.getWorkflow();
  }
  /**
   * Sends workflow to backend to be updated – (Backend - UPDATE workflow in DB)
   * @param {Workflow} workflow
   */
  saveWorkflow(workflow: Workflow) {
    this.http.post('http://localhost:3000/saveWorkflow', {jsondata: workflow}).subscribe(
      (responseData) => {
        console.log(responseData);
        this.workflow.id = responseData + '';
        this.wizardStepperService.updateWorkflow(this.workflow);
      });
  }
  /**
   * Sends workflow to backend to be stored persistently – (Backend - CREATE workflow in DB)
   * @param {Workflow} workflow
   */
  createWorkflow(workflow: Workflow) {
    this.http.post('http://localhost:3000/createWorkflow', {jsondata: workflow}).subscribe(
      (responseData) => {
        console.log(responseData);
        this.workflow.id = responseData + '';
        this.wizardStepperService.updateWorkflow(this.workflow);
      });
  }
  /**
   * Sends workflow to backend to be executed physically
   * @param {Workflow} workflow
   */
  runWorkflow() {
    this.http.post('http://localhost:3000/playWorkflow', {wf_id: this.workflow.id}).subscribe(
      (responseData) => {
        console.log(responseData);
      });
  }
  /**
   * Sends workflow to backend to be updated – (Backend - UPDATE workflow in DB)
   * @param {Workflow} workflow Sends workflow to backend to be updated
   */
  updateWorkflow(workflow: Workflow) {
    console.log(this.workflow);
    this.http.post('http://localhost:3000/updateWorkflow', {jsondata: workflow}).subscribe(
      (responseData) => {
        console.log(responseData);
      });
  }
  /**
   * Requests all workflow saved in backend – (Backend - READ all workflow in DB)
   *
   * Stores response (all workflows) in workflowList locally resp. workflowListSub to share
   */
  getAllWorkflows() {
    this.http.post<WorkflowListElement[]>('http://localhost:3000/readWorkflow/readAll', null).subscribe(
      (responseData) => {
        this.workflowList = responseData;
        this.workflowListSub.next([...this.workflowList]);
        console.log(responseData);
        console.log(this.workflowList);
      });
  }
  /**
   * Getter for oberservable worflowListSub
   * @returns The worflowListSub
   */
  getWorkflowListUpdateListener() {
    return this.workflowListSub.asObservable();
  }
  /**
   * Sends workflow id to backend to be deleted – (Backend - DELETE workflow in DB)
   * @param {number} id ID of workflow
   */
  deleteWorkflow(id: number) {
    return this.http.post('http://localhost:3000/deleteWorkflow/deleteOne', {wf_id: id});
  }
  /**
   * Requests current arm position from backend
   * @returns The requested arm position
   */
  getArmPosition() {
    return this.http.post('http://localhost:3000/RobotDataService/getBasePosition', null);
  }
  /**
   * Requests current base position from backend
   * @returns The requested base position
   */
  getBasePosition() {
    return this.http.post('http://localhost:3000/RobotDataService/getBasePosition', null);
  }
  /**
   * Requests the workflow belonging to id from backend
   * @param {number} id ID from workflow
   * @returns The requested workflow
   */
  getWorkflow(id: number) {
    return this.http.post('http://localhost:3000/readWorkflow/readOne', {wf_id: id});
  }
}

