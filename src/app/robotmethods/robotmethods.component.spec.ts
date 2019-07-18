import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotmethodsComponent } from './robotmethods.component';

describe('RobotmethodsComponent', () => {
  let component: RobotmethodsComponent;
  let fixture: ComponentFixture<RobotmethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotmethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotmethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
