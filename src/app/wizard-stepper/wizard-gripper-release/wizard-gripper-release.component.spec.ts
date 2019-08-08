import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardGripperReleaseComponent } from './wizard-gripper-release.component';

describe('WizardGripperReleaseComponent', () => {
  let component: WizardGripperReleaseComponent;
  let fixture: ComponentFixture<WizardGripperReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardGripperReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardGripperReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
