import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';
import {BaseMove} from '../../model/base-move.model';
import {WizardParentStepperService} from '../wizard-parent/wizard-parent-stepper.service';
import {HttpRequestService} from '../../execution/http-request.service';
import {GripperGrip} from '../../model/gripper-grip.model';

@Component({
  selector: 'app-wizard-base',
  templateUrl: './wizard-base.component.html',
  styleUrls: ['./wizard-base.component.css']
})
export class WizardBaseComponent extends WizardJobComponent implements OnInit, OnDestroy {

  title = 'Base Movement';

  baseMove: BaseMove;
  // baseMove = new BaseMove();

  // slider Activation timout
  disabledActTimeout = false;
  invertActTimeout = false;
  maxActTimeout = 100;
  minActTimeout = 0;
  stepActTimeout = 1;
  thumbLabelActTimeout = true;
  valueActTimeout = 50;
  verticalActTimeout = false;
  goalPose;

  // mat-button next
  isDisabledNext = true;

  constructor(router: Router,
              wizardStepperService: WizardStepperService,
              eventEmitterService: WizardParentStepperService,
              private httpRequest: HttpRequestService) {
    super(router, wizardStepperService, eventEmitterService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.baseMove = this.wizardStepperService.getWorkflowItem() as BaseMove;
    this.valueActTimeout = this.baseMove.activationTimeout;
    this.goalPose = this.baseMove.goalPose;
  }
  onNextClick(): void {
    this.baseMove.activationTimeout = this.valueActTimeout;
    // this.baseMove.goalPose = this.goalPose;
    // console.log(this.baseMove);
    // console.log
    this.wizardStepperService.updateWorkflowItem(this.baseMove);
    if (this.counter < this.workflow.getJobsLength() - 1) {
      this.wizardStepperService.increaseCount();
      this.selectNextJob(this.workflow.getJobName(this.counter));
      // this.selectNextJob(this.jobsUpdated[this.counter]);
      this.router.navigate([this.link]);
    } else {
      this.wizardStepperService.updateCount(this.counter = 0);
      this.link = 'wizard/run';
      this.router.navigate([this.link]);
      this.eventEmitterService.onStepperNextClick();
      console.log('MoveBase onStepperNext wurde ausgeführt');
    }
  }
  onGetPostionClick() {
    this.httpRequest.getBasePosition().subscribe(
      (responseData: number[]) =>  {
        this.baseMove.goalPose = [];
        this.baseMove.goalPose = responseData;
        this.goalPose = this.baseMove.goalPose;
        this.isDisabledNext = false;
        console.log(this.baseMove.goalPose);
      });
  }
  }
