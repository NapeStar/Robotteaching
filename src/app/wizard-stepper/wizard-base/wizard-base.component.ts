import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard-base',
  templateUrl: './wizard-base.component.html',
  styleUrls: ['./wizard-base.component.css']
})
export class WizardBaseComponent implements OnInit {

  title = 'Base';

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
