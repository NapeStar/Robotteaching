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

  httpResult: Object;
  selectedRobotmethod: Object;
  selectedRobotmethods: Array<string> = ['Windstorm'];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    //this.getRobotMethods();
  }

  onSelect(robotmethod: Array<string>): void {
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
  }

  drop(event: CdkDragDrop<string[]>) {
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
