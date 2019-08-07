import { Component, OnInit } from '@angular/core';
import { JobsService} from '../jobs.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import {MoveList} from '../data.moveList';
import {Move} from '../move.data';
import {ChoosenJobsComponent} from '../choosen-jobs/choosen-jobs.component';

@Component({
  selector: 'app-available-jobs',
  templateUrl: './available-jobs.component.html',
  styleUrls: ['./available-jobs.component.css']
})
export class AvailableJobsComponent implements OnInit {

  httpResult: any;
  selectedJob: any;
  ml: MoveList;

  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.getAvailableJobs();
  }

  onSelect(robotmethod: any): void {
    this.selectedJob = robotmethod;
  }

  getAvailableJobs(): void {
    this.jobService.getWorkflows().subscribe(data => {
      this.httpResult = data;
      this.ml = new MoveList(this.httpResult);

      for (const move of this.ml.moveList) {

        console.log('Showing Move: ' + move.name);

      }
      console.log(this.httpResult);
    });
  }


  onClick() {
    this.getAvailableJobs();
  }

  drop(event: CdkDragDrop<Move[]>) {
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.getAvailableJobs();
    }
  }

  /*addToList(event: CdkDragDrop<string[]>){
    this.item3.push(this.item2[event.previousIndex]);
    */

}
