import { Component, OnInit } from '@angular/core';
import { Robotmethod } from '../robotmethod';
import { ROBOTMETHODS} from '../mock-robotmethods';
import { DataService} from '../data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-robotmethods',
  templateUrl: './robotmethods.component.html',
  styleUrls: ['./robotmethods.component.css']
})
export class RobotmethodsComponent implements OnInit {

  httpResult: Object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getRobotMethods();
  }

/*
  onSelect(robotmethod: Robotmethod): void {
    this.selectedRobotmethod = robotmethod;
  }
*/

  getRobotMethods(): void {
    this.dataService.getWorkflows().subscribe(data => {
      this.httpResult = data
      console.log(this.httpResult)
    });
  }

  dataClick() {
    this.getRobotMethods();
  }

}
