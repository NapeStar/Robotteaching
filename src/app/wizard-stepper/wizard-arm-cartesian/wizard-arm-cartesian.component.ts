import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard-arm-cartesian',
  templateUrl: './wizard-arm-cartesian.component.html',
  styleUrls: ['./wizard-arm-cartesian.component.css']
})
export class WizardArmCartesianComponent implements OnInit {

  title = 'Arm Cartesian';

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
