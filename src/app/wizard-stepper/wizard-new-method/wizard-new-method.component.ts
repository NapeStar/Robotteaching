/**
 * All necessary classes, models, services hast not be imported
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';
import {ArmCartesian} from '../../model/arm-cartesian.model';
import {WizardParentStepperService} from '../wizard-parent/wizard-parent-stepper.service';
import {HttpRequestService} from '../../execution/http-request.service';
/**
 * This component is a Child Component of "Wizard-Job".
 *
 * It presents the view of new the method to be added in the configurator ("Wizard-Parent").
 * E.g. to present and enter values Angular Material Design Components where used in the view
 * {@link https://material.angular.io/components/categories}
 */
@Component({
  selector: 'app-wizard-new-method',
  templateUrl: './wizard-new-method.component.html',
  styleUrls: ['./wizard-new-method.component.css']
})
export class WizardNewMethodComponent extends WizardJobComponent implements OnInit,  OnDestroy {
  /**
   * displayed titel of the new component
   */
  title = 'New Method';
  /**
   * local instance of NewMethod
   */
  armCartesian: ArmCartesian;
  /**
   * e.g. view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  disabledActTimeout = false;
  /**
   * e.g. view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  invertActTimeout = false;
  /**
   * e.g. view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  maxActTimeout = 100;
  /**
   * e.g. view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  minActTimeout = 0;
  /**
   * e.g. view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  stepActTimeout = 1;
  /**
   * e.g. view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  thumbLabelActTimeout = true;
  /**
   * e.g. view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  valueActTimeout = 50;
  /**
   * e.g. view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
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
