import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardParentComponent } from './wizard-parent.component';

describe('WizardParentComponent', () => {
  let component: WizardParentComponent;
  let fixture: ComponentFixture<WizardParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
