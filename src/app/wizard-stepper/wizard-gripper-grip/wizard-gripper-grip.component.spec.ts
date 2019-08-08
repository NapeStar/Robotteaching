import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardGripperGripComponent } from './wizard-gripper-grip.component';

describe('WizardGripperGripComponent', () => {
  let component: WizardGripperGripComponent;
  let fixture: ComponentFixture<WizardGripperGripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardGripperGripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardGripperGripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
