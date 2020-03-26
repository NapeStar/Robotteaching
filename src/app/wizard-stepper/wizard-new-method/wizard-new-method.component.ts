/**
 * All necessary classes, models, services hast not be imported
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';
import {WizardParentStepperService} from '../wizard-parent/wizard-parent-stepper.service';
import {HttpRequestService} from '../../execution/http-request.service';
import {NewMethod} from '../../model/new-method.model';
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
  newMethod: NewMethod;
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
  /*
   * cartesian coordinates of robot component
   */
  goalPose;
  /**
   * next button - parameter for Angular Material Button  {@link https://material.angular.io/components/button/overview}
   */
  isDisabledNext = true;
  /**
   * constructor - calls constructor of parent WizardJobComponent
   * @param {Router} router For redirecting
   * @param {WizardStepperService} wizardStepperService For Sharing Workflow Information
   * @param {WizardParentStepperService} eventEmitterService For Sharing Angular Material Stepper View
   * @param {HttpRequestService} httpRequest For getting actual position from robot arm
   */
  constructor(router: Router,
              wizardStepperService: WizardStepperService,
              eventEmitterService: WizardParentStepperService,
              private httpRequest: HttpRequestService) {
    super(router, wizardStepperService, eventEmitterService);
  }
  /**
   * ngOnInit is a lifecycle hook - executed after constructor
   *
   * overrides parent ngOninit() declares additional necessary variables for this component
   */
  ngOnInit() {
    super.ngOnInit();
    this.newMethod = this.wizardStepperService.getWorkflowItem() as NewMethod;
    this.valueActTimeout = this.newMethod.activationTimeout;
    this.goalPose = this.newMethod.goalPose;
  }
  /**
   * overrides parent onNextClick() - updates all necessary variables and Observables
   * before redirects to next wizard job component
   */
  onNextClick(): void {
    this.newMethod.activationTimeout = this.valueActTimeout;
    this.wizardStepperService.updateWorkflowItem(this.newMethod);
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
  /**
   * requests actual position form backend and stores the value
   */
  onGetPostionClick() {
    this.httpRequest.getBasePosition().subscribe(
      (responseData: number[]) =>  {
        this.newMethod.goalPose = [];
        this.newMethod.goalPose = responseData;
        this.goalPose = this.newMethod.goalPose;
        this.isDisabledNext = false;
        console.log(this.newMethod.goalPose);
      });
  }
}
