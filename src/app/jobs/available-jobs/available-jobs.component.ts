import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobsService} from '../jobs.service';
import {Jobs2Service} from '../jobs2.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import {MoveList} from '../data.moveList';
import {Move} from '../move.data';
import {ChoosenJobsComponent} from '../choosen-jobs/choosen-jobs.component';
import {Job} from '../job.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { NgModule } from '@angular/core';
import { WizardStepperService} from '../../wizard-stepper/wizard-stepper.service';


@Component({
  selector: 'app-available-jobs',
  templateUrl: './available-jobs.component.html',
  styleUrls: ['./available-jobs.component.css']
})
export class AvailableJobsComponent implements OnInit, OnDestroy {

  httpResult: any;
  selectedJob: any;
  selectedJobs: Move[];
  copiedJobs: Move[];
  ml: MoveList;
  jobs: Job[] = [];

  jobsUpdated: Job[] = [];
  private jobsSub: Subscription;
  link = 'wizard/';

  constructor(private jobService: JobsService, private router: Router, private wizardStepperService: WizardStepperService) { }

  ngOnInit() {
    this.getAvailableJobs();
    this.selectedJobs = [];
    this.copiedJobs = [...this.selectedJobs];
    this.jobsSub = this.wizardStepperService.getJobs()
      .subscribe(jobsUpdated => {
        this.jobsUpdated = jobsUpdated;
        // console.log(this.jobsUpdated);
      });
  }
  ngOnDestroy() {
    this.jobsSub.unsubscribe();
  }
  onSelect(job: any): void {
    this.selectedJob = job;
  }
  getAvailableJobs(): void {
    this.jobService.getWorkflows().subscribe(data => {
      this.httpResult = data;
      this.ml = new MoveList(this.httpResult);
      console.log(this.httpResult);
    });
  }

  onNextClick(): void {
    if (this.jobsUpdated.length > 0) {
      this.selectNextJob(this.jobsUpdated.reverse().pop());
      this.jobsUpdated.reverse();
      this.wizardStepperService.updateJob(this.jobsUpdated);
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
    // this.jobService2.saveJobs(this.selectedJobs);
  }

  selectNextJob(job: Job) {
    this.link = 'wizard/';
    switch (job.id) {
        case 0: {
          this.link += 'gripper_grip';
          break;
        }
        case 1: {
          this.link += 'arm_trajectory';
          break;
        }
        case 2: {
          this.link += 'arm_trajectory';
          break;
        }
        case 3: {
          this.link += 'arm_joints';
          break;
        }
        case 4: {
          this.link += 'base';
          break;
        }
        case 5: {
          this.link += 'arm_cartesian';
          break;
        }
        case 6: {
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
  }

  /*addToList(event: CdkDragDrop<string[]>){
    this.item3.push(this.item2[event.previousIndex]);
    */

}
