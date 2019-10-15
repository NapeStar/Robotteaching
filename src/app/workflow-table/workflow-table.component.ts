import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WorkflowListElement} from '../model/workflow-list-element.model';
import {Subscription} from 'rxjs';
import {HttpRequestService} from '../execution/http-request.service';
import {Workflow} from '../model/workflow.model';
import {WizardStepperService} from '../wizard-stepper/wizard-stepper.service';
import {Move} from '../jobs/move.data';


@Component({
  selector: 'app-workflow-table',
  templateUrl: './workflow-table.component.html',
  styleUrls: ['./workflow-table.component.css']
})
export class WorkflowTableComponent implements OnInit {

  workflowList: WorkflowListElement[] = [];
  private workflowListSub: Subscription;

  link: string;

  workflow: Workflow;
  // private workflowSub: Subscription;

  status: string;

  displayedColumns: string[] = ['id', 'name', 'created', 'action'];
  dataSource = this.workflowList;

  constructor(protected router: Router,
              private wizardStepperService: WizardStepperService,
              private httpRequest: HttpRequestService) { }

  ngOnInit() {this.httpRequest.getAllWorkflows();
              this.httpRequest.getWorkflowListUpdateListener()
                .subscribe((workflowList: WorkflowListElement[]) => {
                  this.workflowList = workflowList;
                  this.dataSource = this.workflowList;
                });
              // this.workflowSub = this.wizardStepperService.getWorkflowListener()
              //   .subscribe(workflow => {
              //     this.workflow = workflow;
              //   });
              // this.workflow = this.wizardStepperService.getWorkflow();
  }

  addNew(): void {
    this.status = 'create';
    this.wizardStepperService.updateStatus(this.status);
    console.log(this.wizardStepperService.getStatus());
    this.router.navigate(['jobs']);
  }
  onUpdateClick(id: number): void {

    // console.log(id);
    // this.httpRequest.getWorkflow(id).subscribe((data: any) => {
    //   console.log(data);
    // });
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
        this.wizardStepperService.updateCount( 0);
        this.wizardStepperService.updateStatus(this.status);
        console.log(data);
        console.log(this.wizardStepperService.getCounter());
        console.log(this.wizardStepperService.getStatus());
        this.selectNextJob(this.workflow.getJobName(0));
        this.router.navigate([this.link]);
      });
  }
  onDeleteClick(id: number): void {
    this.httpRequest.deleteWorkflow(id).subscribe((data: any) => {
      console.log(data);
      setTimeout (() => {
        this.httpRequest.getAllWorkflows();
      }, 500);
    });
  }
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
      this.wizardStepperService.updateCount( 0);
      this.wizardStepperService.updateStatus(this.status);
      console.log(data);
      console.log(this.wizardStepperService.getCounter());
      console.log(this.wizardStepperService.getStatus());
      this.link = 'wizard/run';
      this.router.navigate([this.link]);
    });
  }

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
