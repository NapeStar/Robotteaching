import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {Subscription} from 'rxjs';
import {Workflow} from '../../model/workflow.model';
import {WizardParentStepperService} from '../wizard-parent/wizard-parent-stepper.service';

/**
 * This component is the Parent Component of all "Wizard" Components e.g. WizardGripperGripComponent. It contains
 * all basic functionalities, which may be overrided by the Child Components
 */
@Component({
  selector: 'app-wizard-job',
  templateUrl: './wizard-job.component.html',
  styleUrls: ['./wizard-job.component.css']
})
export class WizardJobComponent implements OnInit, OnDestroy {
  /**
   * string used for routing/redirecting
   */
  link = 'wizard/';
  /**
   * locally stored workflow
   */
  workflow: Workflow;
  /**
   * Subscription for observed workflowSub -> synchronized and shared workflow
   */
  private workflowSub: Subscription;
  /**
   * locally stored counter
   *
   * index for navigating through wizard
   */
  counter: number;
  /**
   * Subscription for counterSub -> synchronized and shared counter
   */
  private counterSub: Subscription;

  /**
   * locally stored status e.g. 'create'
   *
   * important to navigate through wizard via back and forward buttons
   */
  status: string;
  /**
   * Subscription for stusSub -> synchronized and shared status
   */
  private statusSub: Subscription;

  /**
   * constructor
   * @param {Router} router For redirecting
   * @param {WizardStepperService} wizardStepperService For Sharing Workflow Information
   * @param {WizardParentStepperService} eventEmitterService For Sharing Angular Material Stepper View
   */
  constructor(protected router: Router,
              protected wizardStepperService: WizardStepperService,
              protected eventEmitterService: WizardParentStepperService  ) { }
  /**
   * ngOnInit is a lifecycle hook
   * - executed after constructor
   *
   * declaration of all necessary variables for this component
   */
  ngOnInit() {
    this.counterSub = this.wizardStepperService.getCounterListener()
      .subscribe(counter => {
        this.counter = counter;
      });
    this.workflowSub = this.wizardStepperService.getWorkflowListener()
      .subscribe(workflow => {
        this.workflow = workflow;
      });
    this.statusSub = this.wizardStepperService.getStatusListener()
      .subscribe(data => {
        this.status = data;
        console.log(this.status);
      });
    this.status = this.wizardStepperService.getStatus();
    this.workflow = this.wizardStepperService.getWorkflow();
    this.counter = this.wizardStepperService.getCounter();
    console.log(this.status);
    console.log(this.counter);
    console.log(this.workflow);
  }
  /**
   * updates all necessary variables and Observables
   * before redirects to next wizard job component
   */
  onNextClick(): void {
    if (this.counter < this.workflow.getJobsLength() - 1) {
      this.wizardStepperService.increaseCount();
      this.selectNextJob(this.workflow.getJobName(this.counter));
      this.router.navigate([this.link]);
    } else {
      this.wizardStepperService.updateCount(this.counter = 0);
      this.link = 'wizard/run';
      this.router.navigate([this.link]);
      this.eventEmitterService.onStepperNextClick();
      console.log('onStepperNext wurde ausgeführt');
    }
  }
  /**
   * updates all necessary variables and Oberservables
   * before redirects to "previous" wizard job component
   */
  onPreviousClick(): void {
    this.wizardStepperService.decreaseCount();
    if (this.counter >= 0) {
      this.selectNextJob(this.workflow.getJobName(this.counter));
      this.router.navigate([this.link]);
    } else if (this.status === 'create') {
      this.link = 'jobs';
      this.router.navigate([this.link]);
      this.eventEmitterService.onStepperBackClick();
    } else {
      this.link = '';
      this.router.navigate([this.link]);
      this.eventEmitterService.onStepperBackClick();
    }
  }

  /**
   * ngOnDestroy is a lifecycle hook - is called when a directive, pipe, or service is destroyed
   *
   * unsubscribes Subscriptions
   */
  ngOnDestroy() {
    this.counterSub.unsubscribe();
    this.workflowSub.unsubscribe();
    this.statusSub.unsubscribe();
    console.log('Destroy Job ausgeführt');
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
