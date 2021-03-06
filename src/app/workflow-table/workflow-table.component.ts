import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WorkflowListElement} from '../model/workflow-list-element.model';
import {Subscription} from 'rxjs';
import {HttpRequestService} from '../execution/http-request.service';
import {Workflow} from '../model/workflow.model';
import {WizardStepperService} from '../wizard-stepper/wizard-stepper.service';

/**
 * This component is the first page the users see.
 *
 * It presents all workflows, which are stored in backend, in a list.
 * Via clicking icons all CRUD operations are possible for the workflows
 */
@Component({
  selector: 'app-workflow-table',
  templateUrl: './workflow-table.component.html',
  styleUrls: ['./workflow-table.component.css']
})
export class WorkflowTableComponent implements OnInit {
  /**
   * list of all display workflows in overview table
   */
  workflowList: WorkflowListElement[] = [];

  // private workflowListSub: Subscription;
  /**
   * string used for routing/redirecting
   */
  link: string;
  /**
   * locally stored workflow
   */
  workflow: Workflow;
  /**
   * locally stored status e.g. 'create'
   *
   * important to navigate through wizard via back and forward buttons
   */
  status: string;
  /**
   * column names in view
   */
  displayedColumns: string[] = ['id', 'name', 'created', 'action'];
  /**
   * view variable - list of all display workflows in overview table
   */
  dataSource = this.workflowList;
  /**
   * constructor
   * @param {Router} router For redirecting
   * @param {WizardStepperService} wizardStepperService For Sharing Workflow Information
   * @param {HttpRequestService} httpRequest For communicating with backend
   */
  constructor(protected router: Router,
              private wizardStepperService: WizardStepperService,
              private httpRequest: HttpRequestService,
  ) {
  }
  /**
   * ngOnInit is a lifecycle hook
   * - executed after constructor
   *
   * declaration of all necessary variables for this component
   */
  ngOnInit() {
    this.httpRequest.getAllWorkflows();
    this.httpRequest.getWorkflowListUpdateListener()
      .subscribe((workflowList: WorkflowListElement[]) => {
        this.workflowList = workflowList;
        this.dataSource = this.workflowList;
      });
  }
  /**
   * redirects to available-jobs component
   */
  addNew(): void {
    this.status = 'create';
    this.wizardStepperService.updateStatus(this.status);
    console.log(this.wizardStepperService.getStatus());
    this.router.navigate(['jobs']);
  }
  /**
   * requests workflow data for selected workflow from backend
   * and stores the wf data in "workflow" and
   * redirects to component of 1st job in workflow list
   * @param {number} id ID of selected workflow
   */
  onUpdateClick(id: number): void {
    this.status = 'update';
    this.httpRequest.getWorkflow(id).subscribe((data: any) => {
      this.workflow = new Workflow(data._name);
      this.workflow.id = data._id;
      this.workflow.created_at = data._created_at;

      for (const workflow of data._jobsObjects) {
        console.log(workflow._name);
        console.log(workflow);
        this.workflow.addJobsFormWorkflow(workflow);
      }
      console.log(this.workflow);

      this.wizardStepperService.updateWorkflow(this.workflow);
      this.wizardStepperService.updateCount(0);
      this.wizardStepperService.updateStatus(this.status);
      console.log(data);
      console.log(this.wizardStepperService.getCounter());
      console.log(this.wizardStepperService.getStatus());
      this.selectNextJob(this.workflow.getJobName(0));
      this.router.navigate([this.link]);
    });
  }
  /**
   * deletes workflow from workflow-table and
   * sends the wf-id to be deleted to backend
   * @param {number} id ID of selected workflow
   */
  onDeleteClick(id: number): void {
    this.httpRequest.deleteWorkflow(id).subscribe((data: any) => {
      console.log(data);
      setTimeout(() => {
        this.httpRequest.getAllWorkflows();
      }, 500);
    });
  }
  /**
   * requests workflow data for selected workflow from backend
   * and stores the wf data in "workflow" and
   * redirects to execution-run component
   * @param {number} id ID of selected workflow
   */
  onPlayClick(id: number): void {
    this.status = 'play';
    this.httpRequest.getWorkflow(id).subscribe((data: any) => {
      this.workflow = new Workflow(data._name);
      this.workflow.id = data._id;
      this.workflow.created_at = data._created_at;

      for (const workflow of data._jobsObjects) {
        console.log(workflow._name);
        console.log(workflow);
        this.workflow.addJobsFormWorkflow(workflow);
      }
      console.log(this.workflow);
      this.wizardStepperService.updateWorkflow(this.workflow);
      this.wizardStepperService.updateCount(0);
      this.wizardStepperService.updateStatus(this.status);
      console.log(data);
      console.log(this.wizardStepperService.getCounter());
      console.log(this.wizardStepperService.getStatus());
      this.link = 'wizard/run';
      this.router.navigate([this.link]);
    });
  }
  /**
   * stores 1st job's routing-link under link
   * @param {string} name Name of 1st job in selected workflow
   */
  selectNextJob(job: string) {
    this.link = 'wizard/';
    switch (job) {
      case 'GripperGrip': {
        this.link += 'gripper_grip';
        break;
      }
      case 'MoveArmOnTrajectoryWorkflow': {
        this.link += 'arm_trajectory';
        break;
      }
      case 'CustomWorkflow': {
        this.link += 'arm_trajectory';
        break;
      }
      case 'MoveArmJointsWorkflow': {
        this.link += 'arm_joints';
        break;
      }
      case 'BaseMove': {
        this.link += 'base';
        break;
      }
      case 'ArmCartesian': {
        this.link += 'arm_cartesian';
        break;
      }
      case 'GripperRelease': {
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
