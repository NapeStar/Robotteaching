import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard-arm-joins',
  templateUrl: './wizard-arm-joins.component.html',
  styleUrls: ['./wizard-arm-joins.component.css']
})
export class WizardArmJoinsComponent implements OnInit {

  title = 'Arm Joins';

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
