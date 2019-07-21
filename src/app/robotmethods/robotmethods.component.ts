import { Component, OnInit } from '@angular/core';
import { Robotmethod } from '../robotmethod';
import { ROBOTMETHODS} from '../mock-robotmethods';
import { DataService} from '../data.service';
import {Observable} from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-robotmethods',
  templateUrl: './robotmethods.component.html',
  styleUrls: ['./robotmethods.component.css']
})
export class RobotmethodsComponent implements OnInit {

  loaded = false;
  httpResult: any;
  selectedRobotmethod: any;
  httpResultList: any[];
  // selectedRobotmethods: string[];
  selectedRobotmethods: Array<string> = ['Windstorm'];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.getRobotMethods();
  }

  onSelect(robotmethod: string): void {
    this.selectedRobotmethod = robotmethod;
  }

  getRobotMethods(): void {
    this.dataService.getWorkflows().subscribe(data => {
      this.httpResult = data
      console.log(this.httpResult)
    });
  }

  dataClick() {
    this.getRobotMethods();
    this.loaded = true;
    // this.httpResultList = this.httpResult.result.workflows;
  }

  resetClick() {
    this.getRobotMethods();
    this.selectedRobotmethods = [];
    this.selectedRobotmethods = ['Windstorm'];
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.getRobotMethods();
    }
  }

  /*addToList(event: CdkDragDrop<string[]>){
    this.item3.push(this.item2[event.previousIndex]);
    */

}
