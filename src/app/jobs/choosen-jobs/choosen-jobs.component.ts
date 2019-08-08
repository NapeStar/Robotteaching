import { Component, OnInit } from '@angular/core';
import { JobsService} from '../jobs.service';
import { AvailableJobsComponent} from '../available-jobs/available-jobs.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import {MoveList} from '../data.moveList';
import {Move} from '../move.data';
import {Jobs2Service} from '../jobs2.service';

@Component({
  selector: 'app-choosen-jobs',
  templateUrl: './choosen-jobs.component.html',
  styleUrls: ['./choosen-jobs.component.css']
})
export class ChoosenJobsComponent implements OnInit {

  selectedJob: any;
  selectedJobs: Move[];

  constructor(private jobService: JobsService, private jobService2: Jobs2Service) { }

  ngOnInit() {
    this.selectedJobs = [];
  }

  onSelect(job: any): void {
    this.selectedJob = job;
  }

  onResetClick() {
    this.selectedJobs = [];
  }

  onSaveClick() {
    this.jobService2.saveJobs(this.selectedJobs);
  }

  drop(event: CdkDragDrop<Move[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

  }

}
