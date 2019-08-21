import { TestBed } from '@angular/core/testing';

import { WizardParentStepperService } from './wizard-parent-stepper.service';

describe('WizardParentStepperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WizardParentStepperService = TestBed.get(WizardParentStepperService);
    expect(service).toBeTruthy();
  });
});
