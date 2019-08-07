import { Component, OnInit } from '@angular/core';
import { JobsService} from '../jobs.service';
import { AvailableJobsComponent} from '../available-jobs/available-jobs.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import {MoveList} from '../data.moveList';
import {Move} from '../move.data';

@Component({
  selector: 'app-choosen-jobs',
  templateUrl: './choosen-jobs.component.html',
  styleUrls: ['./choosen-jobs.component.css']
})
export class ChoosenJobsComponent implements OnInit {

  selectedJob: any;
  selectedJobs: Move[];

  constructor(private jobService: JobsService) { }

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
