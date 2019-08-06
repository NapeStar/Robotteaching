import { Component, OnInit } from '@angular/core';
import { JobsService} from '../jobs.service';
import { AvailableJobsComponent} from '../availableJobs/availableJobs.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MoveList} from '../data.moveList';
import {Move} from '../move.data';

@Component({
  selector: 'app-choosen-jobs',
  templateUrl: './choosen-jobs.component.html',
  styleUrls: ['./choosen-jobs.component.css']
})
export class ChoosenJobsComponent implements OnInit {

  selectedJob: any;
  selectedRobotmethods: Move[];

  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.selectedRobotmethods = [];
  }

  onSelect(job: any): void {
    this.selectedJob = job;
  }

  drop(event: CdkDragDrop<Move[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
