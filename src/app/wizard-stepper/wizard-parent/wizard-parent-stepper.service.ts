import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

/**
 * This service is only for the Angular Material Stepper {@link https://material.angular.io/components/stepper/overview}
 *
 * The service changes the stepper's property and  keeps them synchronized
 */
@Injectable({
  providedIn: 'root'
})
export class WizardParentStepperService {
  /**
   * EventEmitter for Next
   */
  invokeNextFunction = new EventEmitter();
  /**
   * EventEmitter for Back
   */
  invokeBackFunction = new EventEmitter();
  /**
   * Subscription for Next
   */
  subsNextVar: Subscription;
  /**
   * Subscription for Back
   */
  subsBackVar: Subscription;

  /**
   * default constructor
   */
  constructor() { }

  /**
   * to go to next step in stepper
   */
  onStepperNextClick() {
    this.invokeNextFunction.emit();
  }
  /**
   * to go one step back in stepper
   */
  onStepperBackClick() {
    this.invokeBackFunction.emit();
  }
}

