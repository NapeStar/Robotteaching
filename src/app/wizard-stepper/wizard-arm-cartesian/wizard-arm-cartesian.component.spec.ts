import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardArmCartesianComponent } from './wizard-arm-cartesian.component';

describe('WizardArmCartesianComponent', () => {
  let component: WizardArmCartesianComponent;
  let fixture: ComponentFixture<WizardArmCartesianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardArmCartesianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardArmCartesianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
