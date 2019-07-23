import { Component, OnInit } from '@angular/core';
import { Robotmethod } from '../robotmethod';
import { ROBOTMETHODS} from '../mock-robotmethods';
import { DataService} from '../data.service';
import {Observable} from 'rxjs';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MoveList} from '../datatypes/data.moveList';
import {Move} from '../datatypes/move.data';

@Component({
  selector: 'app-robotmethods',
  templateUrl: './robotmethods.component.html',
  styleUrls: ['./robotmethods.component.css']
})
export class RobotmethodsComponent implements OnInit {

  loaded = false;
  httpResult: any;
  selectedRobotmethod: any;
  ml: MoveList;

  httpResultList: any[];
  selectedRobotmethods: Move[];
  // selectedRobotmethods: Array<string> = ['Windstorm'];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.getRobotMethods();
    // this.ml = new MoveList("");
    this.getRobotMethods();
    this.selectedRobotmethods = [];
  }

  onSelect(robotmethod: any): void {
    this.selectedRobotmethod = robotmethod;
  }

  getRobotMethods(): void {
    this.dataService.getWorkflows().subscribe(data => {
      this.httpResult = data;
      this.ml = new MoveList(this.httpResult);

      for (const move of this.ml.moveList) {

        console.log('Showing Move: ' + move.name);

      }
      console.log(this.httpResult);
    });
  }

  dataClick() {
    this.getRobotMethods();
    this.selectedRobotmethods = [];
    // this.loaded = true;
    // this.httpResultList = this.httpResult.result.workflows;
  }

  resetClick() {
    this.getRobotMethods();
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
      this.getRobotMethods();
    }
  }

  /*addToList(event: CdkDragDrop<string[]>){
    this.item3.push(this.item2[event.previousIndex]);
    */

}
