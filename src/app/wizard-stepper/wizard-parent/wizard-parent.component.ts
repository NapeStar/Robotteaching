import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material';
import {WizardParentStepperService} from './wizard-parent-stepper.service';

/**
 * This component is the ParentView in the "Workflow Configurator".
 * The view of the component contains the "wizard-stepper" {@link https://material.angular.io/components/stepper/overview}
 */
@Component({
  selector: 'app-wizard-parent',
  templateUrl: './wizard-parent.component.html',
  styleUrls: ['./wizard-parent.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue:
      {displayDefaultIndicatorType: false}
  }]
})
export class WizardParentComponent implements OnInit, OnDestroy {

  /**
   * titel in view
   */
  title = 'Workflow Configurator';
  /**
   * Angular Material Stepper {@link https://material.angular.io/components/stepper/overview}
   */
  @ViewChild('stepper', {static: true}) stepper: MatStepper;

  /**
   * constructor needs eventEmitterService for
   * Angular Material Stepper {@link https://material.angular.io/components/stepper/overview}
   * @param {WizardParentStepperService} eventEmitterService
   */
  constructor(private eventEmitterService: WizardParentStepperService) {
  }

  /**
   * ngOnInit is a lifecycle hook
   * executed after constructor
   *
   * invokes next and back function of
   * Angular Material Stepper {@link https://material.angular.io/components/stepper/overview}
   */
  ngOnInit() {
    console.log(this.eventEmitterService.subsNextVar);
      this.eventEmitterService.subsNextVar = this.eventEmitterService.invokeNextFunction
        .subscribe((name: string) => {
        this.goForward(this.stepper);
        console.log(this.stepper);
      });
      this.eventEmitterService.subsBackVar = this.eventEmitterService.invokeBackFunction
        .subscribe((name: string) => {
          this.goBack(this.stepper);
          console.log(this.stepper);
        });
    console.log(this.eventEmitterService.subsNextVar);
    console.log('OnInit wurde ausgführt');
  }
  /**
   * ngOnDestroy is a lifecycle hook
   *
   * is called when a directive, pipe, or service is destroyed
   *
   * Use for any custom cleanup that needs to occure when the instance is destroyed
   */
  ngOnDestroy() {
    this.eventEmitterService.subsNextVar.unsubscribe();
    this.eventEmitterService.subsBackVar.unsubscribe();
    this.reset(this.stepper);
    console.log('OnDestroy wurde ausgeführt');
  }
  /**
   * resets stepper
   *
   * Angular Material Stepper {@link https://material.angular.io/components/stepper/overview}
   * @param {MatStepper} stepper
   */
  goBack(stepper: MatStepper) {
    stepper.reset();
    console.log('GoBAck wurde ausgefürht');
  }
  /**
   * checks next step of stepper and sets current step true
   * Angular Material Stepper {@link https://material.angular.io/components/stepper/overview}
   * @param {MatStepper} stepper
   */
  goForward(stepper: MatStepper) {
    if (stepper.selectedIndex < 2) {
      stepper.selected.completed = true;
      setTimeout(() => {
        stepper.next();
      }, 1);
    } else if (stepper.selectedIndex === 2) {
      stepper.selected.completed = true;
    }
    console.log('Forward wurde ausgefürht');
  }
  /**
   * resets stepper
   *
   * Angular Material Stepper {@link https://material.angular.io/components/stepper/overview}
   * @param {MatStepper} stepper
   */
  reset(stepper: MatStepper) {
    stepper.reset();
  }

}
