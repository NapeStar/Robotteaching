import {Component, OnInit, OnDestroy, SimpleChange} from '@angular/core';
import { JobsService} from '../jobs.service';
import {Jobs2Service} from '../jobs2.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import {MoveList} from '../data.moveList';
import {Move} from '../move.data';
import {Job} from '../job.model';
import {Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { NgModule } from '@angular/core';
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

@Component({
  selector: 'app-available-jobs',
  templateUrl: './available-jobs.component.html',
  styleUrls: ['./available-jobs.component.css']
})
export class AvailableJobsComponent implements OnInit, OnDestroy {

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  name = '';

  // mat-button next
  isDisabledNext = true;

  httpResult: any;
  selectedJob: any;
  selectedJobs: string[];
  copiedJobs: string[];
  ml: MoveList;
  jobs: string[] = [];

  private response: string[];
  private responseSub = Subscription;

  workflow: Workflow;
  private workflowSub: Subscription;

  jobsUpdated: string[] = [];
  private jobsSub: Subscription;
  link = 'wizard/';

  counter: number;
  counterSub: Subscription;

  constructor(private jobService: JobsService,
              private router: Router,
              private wizardStepperService: WizardStepperService) { }

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
  ngOnDestroy() {
    this.selectedJobs = [];
    this.copiedJobs = [...this.selectedJobs];
    this.jobsSub.unsubscribe();
    this.counterSub.unsubscribe();
    this.workflowSub.unsubscribe();
    console.log('OnDestroy wurde ausgeführt');
  }
  onSelect(job: any): void {
    this.selectedJob = job;
  }
  getAvailableJobs(): void {
    this.jobService.getJobsFromServer();
  }

  onNextClick(): void {
    if (this.jobsUpdated.length > 0) {
      this.selectNextJob(this.workflow.getJobName(0));
      this.router.navigate([this.link]);
    } else {
      alert('no jobs selected');
    }
  }

  onClick() {
    this.getAvailableJobs();
  }

  onResetClick() {
    this.selectedJobs = [];
    this.wizardStepperService.updateJob(this.selectedJobs);
    console.log(this.jobsUpdated);
  }

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

  selectNextJob(job: string) {
    this.link = 'wizard/';
    switch (job) {
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
