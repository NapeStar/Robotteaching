import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardArmTrajectoryComponent } from './wizard-arm-trajectory.component';

describe('WizardArmTrajectoryComponent', () => {
  let component: WizardArmTrajectoryComponent;
  let fixture: ComponentFixture<WizardArmTrajectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardArmTrajectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardArmTrajectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
