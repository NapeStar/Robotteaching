import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard-arm-trajectory-movement',
  templateUrl: './wizard-arm-trajectory.component.html',
  styleUrls: ['./wizard-arm-trajectory.component.css']
})
export class WizardArmTrajectoryComponent implements OnInit {

  title = 'Arm Trajectory';

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 50;
  vertical = false;

  constructor() { }

  ngOnInit() {
  }

}
