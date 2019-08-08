import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
// import {coerceNumberProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'app-wizard-gripper-grip',
  templateUrl: './wizard-gripper-grip.component.html',
  styleUrls: ['./wizard-gripper-grip.component.css']
})
export class WizardGripperGripComponent implements OnInit {

  title = 'Gripper Grip';

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

  // get tickInterval(): number | 'auto' {
  //   return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  // }
  // set tickInterval(value) {
  //   this._tickInterval = coerceNumberProperty(value);
  // }


}
