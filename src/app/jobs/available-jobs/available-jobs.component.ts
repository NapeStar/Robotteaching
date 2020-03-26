import {Component, OnInit, OnDestroy, SimpleChange} from '@angular/core';
import { JobsService} from '../jobs.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import {Move} from '../move.data';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { WizardStepperService} from '../../wizard-stepper/wizard-stepper.service';
import {Workflow} from '../../model/workflow.model';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
/**
 * This component provides the view for drag&drop the choosen methods (jobs).
 * The order of the single jobs (methods) can be defined and a name for the workflow has to be entered.
 */
@Component({
  selector: 'app-available-jobs',
  templateUrl: './available-jobs.component.html',
  styleUrls: ['./available-jobs.component.css']
})
export class AvailableJobsComponent implements OnInit, OnDestroy {

  /**
   * used in view to validate/check if name of workflow is entered
   */
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  /**
   * used in view to handel error if name of workflow is not entered
   */
  matcher = new MyErrorStateMatcher();

  /**
   * in this variable name of workflow is stored
   */
  name = '';

  /**
   * used in view to enable and disable Next button
   */
  isDisabledNext = true;

  httpResult: any;
  selectedJob: any;
  selectedJobs: string[];
  copiedJobs: string[];
  jobs: string[] = [];

  private response: string[];
  private responseSub = Subscription;
  /**
   * locally stored workflow
   */
  workflow: Workflow;
  /**
   * Subscription for observed workflowSub -> synchronized and shared workflow
   */
  private workflowSub: Subscription;

  jobsUpdated: string[] = [];
  private jobsSub: Subscription;
  /**
   * string used for routing/redirecting
   */
  link = 'wizard/';
  /**
   * locally stored counter
   *
   * index for navigating through wizard
   */
  counter: number;
  /**
   * Subscription for counterSub -> synchronized and shared counter
   */
  counterSub: Subscription;
  /**
   * constructor
   * @param {JobsService} jobService
   * @param {Router} router For redirecting
   * @param {WizardStepperService} wizardStepperService For Sharing Workflow Information
   */
  constructor(private jobService: JobsService,
              private router: Router,
              private wizardStepperService: WizardStepperService) { }
  /**
   * ngOnInit is a lifecycle hook
   * - executed after constructor
   *
   * declaration of all necessary variables for this component
   */
  ngOnInit() {
    this.jobService.getJobsFromServer();
    // @ts-ignore
    this.responseSub = this.jobService.responseListener
      .subscribe((response: string[]) => {
      this.response = response;
    });
    this.selectedJobs = [];
    this.copiedJobs = [...this.selectedJobs];

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
    this.name = typeof this.workflow === 'undefined' ? '' : this.workflow.name;
    this.jobsUpdated = this.wizardStepperService.getJobs();
    this.selectedJobs = this.wizardStepperService.getJobs();
    this.wizardStepperService.updateCount(this.counter = 0);
    this.counter = this.wizardStepperService.getCounter();

    console.log(this.workflow);
    console.log(this.counter);
    console.log('OnInit wurde ausgeführt');
  }
  /**
   * ngOnDestroy is a lifecycle hook - is called when a directive, pipe, or service is destroyed
   *
   * resets variables and unsubscribes Subscriptions
   */
  ngOnDestroy() {
    this.selectedJobs = [];
    this.copiedJobs = [...this.selectedJobs];
    this.jobsSub.unsubscribe();
    this.counterSub.unsubscribe();
    this.workflowSub.unsubscribe();
    console.log('OnDestroy wurde ausgeführt');
  }
  /**
   * stores selected jobe name for Drag&Drop
   * @param {any} job Jobname of of selected job
   */
  onSelect(job: any): void {
    this.selectedJob = job;
  }
  /**
   * requests available Jobs from backend
   */
  getAvailableJobs(): void {
    this.jobService.getJobsFromServer();
  }
  /**
   * choose 1st job in workflow list and redirects to this job (job configurator)
   */
  onNextClick(): void {
    if (this.jobsUpdated.length > 0) {
      this.selectNextJob(this.workflow.getJobName(0));
      this.router.navigate([this.link]);
    } else {
      alert('no jobs selected');
    }
  }
  /**
   * refreshes available Jobs from backend
   */
  onClick() {
    this.getAvailableJobs();
  }
  /**
   * resets selected jobs
   */
  onResetClick() {
    this.selectedJobs = [];
    this.wizardStepperService.updateJob(this.selectedJobs);
    console.log(this.jobsUpdated);
  }
  /**
   * stores selected list of jobs in wizardStepperService
   */
  onSaveClick() {
    if (this.jobsUpdated.length > 0) {
      this.workflow = new Workflow(this.name);
      this.workflow.addJobs(this.jobsUpdated);
      this.wizardStepperService.updateWorkflow(this.workflow);
      this.isDisabledNext = false;
      console.log(this.workflow);
    } else {
      alert('no jobs selected');
    }
  }
  /**
   * stores 1st job's routing-link under link
   * @param {string} job Name of 1st job in selected workflow
   */
  selectNextJob(job: string) {
    this.link = 'wizard/';
    switch (job) {
        /**
         * enter new case for 'NewMethod' with 'new_method_path
         */
        case 'NewMethod': {
          this.link += 'new_method_path';
          break;
        }
        case 'GripperGrip': {
          this.link += 'gripper_grip';
          break;
        }
        case 'MoveArmOnTrajectory': {
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
  /**
   * Drag&Drop from Angular Material {@link https://material.angular.io/cdk/drag-drop/overview}
   * @param {CdkDragDrop} event
   */
  drop(event: CdkDragDrop<Move[]>) {
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.getAvailableJobs();
    }
    this.wizardStepperService.updateJob(this.selectedJobs);
    console.log(this.jobsUpdated.length);
    console.log(this.counter);
  }
}
