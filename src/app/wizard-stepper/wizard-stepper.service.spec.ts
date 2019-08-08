import { TestBed } from '@angular/core/testing';

import { WizardStepperService } from './wizard-stepper.service';

describe('WizardStepperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WizardStepperService = TestBed.get(WizardStepperService);
    expect(service).toBeTruthy();
  });
});
