import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardArmJoinsComponent } from './wizard-arm-joins.component';

describe('WizardArmJoinsComponent', () => {
  let component: WizardArmJoinsComponent;
  let fixture: ComponentFixture<WizardArmJoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardArmJoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardArmJoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
