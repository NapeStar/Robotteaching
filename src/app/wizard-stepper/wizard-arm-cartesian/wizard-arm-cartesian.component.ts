import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';
import {ArmCartesian} from '../../model/arm-cartesian.model';
import {BaseMove} from '../../model/base-move.model';
import {WizardParentStepperService} from '../wizard-parent/wizard-parent-stepper.service';
import {HttpRequestService} from '../../execution/http-request.service';

@Component({
  selector: 'app-wizard-arm-cartesian',
  templateUrl: './wizard-arm-cartesian.component.html',
  styleUrls: ['./wizard-arm-cartesian.component.css']
})
export class WizardArmCartesianComponent extends WizardJobComponent implements OnInit,  OnDestroy {


  title = 'Arm Cartesian';

  armCartesian: ArmCartesian;
  // armCartesian = new ArmCartesian();

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
    this.armCartesian = this.wizardStepperService.getWorkflowItem() as ArmCartesian;
    this.valueActTimeout = this.armCartesian.activationTimeout;
    this.goalPose = this.armCartesian.goalPose;
  }
  onNextClick(): void {
    this.armCartesian.activationTimeout = this.valueActTimeout;
    this.wizardStepperService.updateWorkflowItem(this.armCartesian);
    if (this.counter < this.workflow.getJobsLength() - 1) {
      this.wizardStepperService.increaseCount();
      this.selectNextJob(this.workflow.getJobName(this.counter));
      this.router.navigate([this.link]);
    } else {
      this.wizardStepperService.updateCount(this.counter = 0);
      this.link = 'wizard/run';
      this.router.navigate([this.link]);
      this.eventEmitterService.onStepperNextClick();
      console.log('ArmCatesian onStepperNext wurde ausgeführt');
    }
  }
  onGetPostionClick() {
    this.httpRequest.getBasePosition().subscribe(
      (responseData: number[]) =>  {
        this.armCartesian.goalPose = [];
        this.armCartesian.goalPose = responseData;
        this.goalPose = this.armCartesian.goalPose;
        this.isDisabledNext = false;
        console.log(this.armCartesian.goalPose);
      });
  }
}
