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


@Component({
  selector: 'app-available-jobs',
  templateUrl: './available-jobs.component.html',
  styleUrls: ['./available-jobs.component.css']
})
export class AvailableJobsComponent implements OnInit {

  httpResult: any;
  selectedJob: any;
  selectedJobs: Move[];
  copiedJobs: Move[];
  ml: MoveList;
  jobs: Job[] = [];
  private jobsSub: Subscription;
  link = 'wizard/';

  constructor(private jobService: JobsService, private router: Router) { }

  ngOnInit() {
    this.getAvailableJobs();
    this.selectedJobs = [];
    this.copiedJobs = [...this.selectedJobs];
    // this.jobService2.getJobs();
    // this.jobsSub = this.jobService2.getJobsUpdateListener()
    //   .subscribe((jobs: Job[]) => {
    //     this.jobs = jobs;
    //     });
  }

  onSelect(job: any): void {
    this.selectedJob = job;
  }

  // ngOnDestroy() {
  //   this.jobsSub.unsubscribe();
  // }

  getAvailableJobs(): void {
    this.jobService.getWorkflows().subscribe(data => {
      this.httpResult = data;
      this.ml = new MoveList(this.httpResult);

      // for (const move of this.ml.moveList) {
      //
      //   console.log('Showing Move: ' + move.name);
      //
      // }
      console.log(this.httpResult);
    });
  }

  onClick() {
    this.getAvailableJobs();
  }

  onResetClick() {
    this.selectedJobs = [];
  }

  onSaveClick() {
    // this.jobService2.saveJobs(this.selectedJobs);
  }

  selecetNextJob() {
    this.link = 'wizard/';
    switch (this.copiedJobs.reverse().pop().id) {
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

  onNextClick() {
    if (this.copiedJobs.length > 0) {
      this.selecetNextJob();
      console.log(this.link);
      this.router.navigate([this.link]);
    } else {
      alert('no jobs selected');
    }
    console.log(this.copiedJobs.length);
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
    this.copiedJobs = [...this.selectedJobs];
  }

  /*addToList(event: CdkDragDrop<string[]>){
    this.item3.push(this.item2[event.previousIndex]);
    */

}
