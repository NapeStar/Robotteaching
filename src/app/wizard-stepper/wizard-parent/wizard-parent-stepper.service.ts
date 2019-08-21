import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardParentStepperService {

  invokeNextFunction = new EventEmitter();
  invokeBackFunction = new EventEmitter();
  subsNextVar: Subscription;
  subsBackVar: Subscription;

  constructor() { }

  onStepperNextClick() {
    this.invokeNextFunction.emit();
  }
  onStepperBackClick() {
    this.invokeBackFunction.emit();
  }
}

