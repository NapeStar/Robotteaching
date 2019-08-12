import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';

@Component({
  selector: 'app-wizard-arm-cartesian',
  templateUrl: './wizard-arm-cartesian.component.html',
  styleUrls: ['./wizard-arm-cartesian.component.css']
})
export class WizardArmCartesianComponent extends WizardJobComponent implements OnInit,  OnDestroy {

  title = 'Arm Cartesian';

  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 50;
  vertical = false;

  constructor(router: Router,
              wizardStepperService: WizardStepperService) {
    super(router, wizardStepperService);
  }
}
