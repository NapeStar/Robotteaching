import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material';
import {WizardParentStepperService} from './wizard-parent-stepper.service';

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

  title = 'Workflow Wizard';
  @ViewChild('stepper', {static: true}) stepper: MatStepper;

  constructor(private eventEmitterService: WizardParentStepperService) {
  }

  message: string;

  ngOnInit() {
    console.log(this.eventEmitterService.subsNextVar);
    // if (this.eventEmitterService.subsNextVar === undefined) {
      this.eventEmitterService.subsNextVar = this.eventEmitterService.invokeNextFunction
        .subscribe((name: string) => {
        this.goForward(this.stepper);
        console.log(this.stepper);
      });
    // }
    // if (this.eventEmitterService.subsBackVar === undefined) {
      this.eventEmitterService.subsBackVar = this.eventEmitterService.invokeBackFunction
        .subscribe((name: string) => {
          this.goBack(this.stepper);
          console.log(this.stepper);
        });
    // }
    console.log(this.eventEmitterService.subsNextVar);
    console.log('OnInit wurde ausgführt');
  }
  ngOnDestroy() {
    this.eventEmitterService.subsNextVar.unsubscribe();
    this.eventEmitterService.subsBackVar.unsubscribe();
    this.reset(this.stepper);
    console.log('OnDestroy wurde ausgeführt');
  }
  goBack(stepper: MatStepper) {
      // stepper.selected.completed = false;
      // const index = stepper.selectedIndex;
      // if (index > 0) {
      //   stepper.selectedIndex = index - 1;
      //   stepper.selected.completed = false;
      // }
    stepper.reset();
    console.log('GoBAck wurde ausgefürht');
  }

  goForward(stepper: MatStepper) {
    if (stepper.selectedIndex < 2) {
      stepper.selected.completed = true;
      setTimeout(() => {           // or do some API calls/ Async events
        stepper.next();
      }, 1);
    } else if (stepper.selectedIndex === 2) {
      stepper.selected.completed = true;
    }
    console.log('Forward wurde ausgefürht');
  }

  reset(stepper: MatStepper) {
    stepper.reset();
  }

}
