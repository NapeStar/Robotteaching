import { Component, OnInit } from '@angular/core';
import { JobsService} from '../jobs.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MoveList} from '../data.moveList';
import {Move} from '../move.data';

@Component({
  selector: 'app-robotmethods',
  templateUrl: './availableJobs.component.html',
  styleUrls: ['./availableJobs.component.css']
})
export class AvailableJobsComponent implements OnInit {

  httpResult: any;
  selectedRobotmethod: any;
  ml: MoveList;

  selectedRobotmethods: Move[];

  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.getAvailableJobs();
    this.selectedRobotmethods = [];
  }

  onSelect(robotmethod: any): void {
    this.selectedRobotmethod = robotmethod;
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

  dataClick() {
    this.getAvailableJobs();
    this.selectedRobotmethods = [];
    // this.loaded = true;
    // this.httpResultList = this.httpResult.result.workflows;
  }

  resetClick() {
    this.getAvailableJobs();
    this.selectedRobotmethods = [];
    // this.selectedRobotmethods = ['Windstorm'];
  }


  drop(event: CdkDragDrop<Move[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
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
