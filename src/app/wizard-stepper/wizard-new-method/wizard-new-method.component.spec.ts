import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardNewMethodComponent } from './wizard-new-method.component';

describe('WizardNewMethodComponent', () => {
  let component: WizardNewMethodComponent;
  let fixture: ComponentFixture<WizardNewMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardNewMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardNewMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
