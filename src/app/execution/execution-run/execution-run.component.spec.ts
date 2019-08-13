import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionRunComponent } from './execution-run.component';

describe('ExecutionRunComponent', () => {
  let component: ExecutionRunComponent;
  let fixture: ComponentFixture<ExecutionRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutionRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
