import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingPageJobsComponent } from './starting-page-jobs.component';

describe('StartingPageJobsComponent', () => {
  let component: StartingPageJobsComponent;
  let fixture: ComponentFixture<StartingPageJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingPageJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingPageJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
