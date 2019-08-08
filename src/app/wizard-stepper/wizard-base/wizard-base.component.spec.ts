import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardBaseComponent } from './wizard-base.component';

describe('WizardBaseComponent', () => {
  let component: WizardBaseComponent;
  let fixture: ComponentFixture<WizardBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
