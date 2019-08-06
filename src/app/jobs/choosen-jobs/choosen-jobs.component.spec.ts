import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosenJobsComponent } from './choosen-jobs.component';

describe('ChoosenJobsComponent', () => {
  let component: ChoosenJobsComponent;
  let fixture: ComponentFixture<ChoosenJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosenJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosenJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
