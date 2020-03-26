import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';
import {WizardParentStepperService} from '../wizard-parent/wizard-parent-stepper.service';

@Component({
  selector: 'app-wizard-arm-trajectory-movement',
  templateUrl: './wizard-arm-trajectory.component.html',
  styleUrls: ['./wizard-arm-trajectory.component.css']
})
export class WizardArmTrajectoryComponent extends WizardJobComponent implements OnInit, OnDestroy {
  /**
   * displayed titel of the component
   */
  title = 'Arm Trajectory';
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  disabled = false;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  invert = false;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  max = 100;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  min = 0;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  step = 1;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  thumbLabel = true;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  value = 50;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  vertical = false;

  constructor(router: Router,
              wizardStepperService: WizardStepperService,
              eventEmitterService: WizardParentStepperService) {
    super(router, wizardStepperService, eventEmitterService);
  }
}
