import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';
import {BaseMove} from '../../model/base-move.model';
import {WizardParentStepperService} from '../wizard-parent/wizard-parent-stepper.service';
import {HttpRequestService} from '../../execution/http-request.service';
/**
 * This component is a Child Component of "Wizard-Job".
 *
 * It presents the view of method MoveBase in the configurator ("Wizard-Parent").
 * To present and enter values Angular Material Design Components where used in the view
 * {@link https://material.angular.io/components/categories}
 */
@Component({
  selector: 'app-wizard-base',
  templateUrl: './wizard-base.component.html',
  styleUrls: ['./wizard-base.component.css']
})
export class WizardBaseComponent extends WizardJobComponent implements OnInit, OnDestroy {
  /**
   * displayed titel of the component
   */
  title = 'Base Movement';
  /**
   * local instance of BaseMove
   */
  baseMove: BaseMove;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  disabledActTimeout = false;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  invertActTimeout = false;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  maxActTimeout = 100;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  minActTimeout = 0;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  stepActTimeout = 1;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  thumbLabelActTimeout = true;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
   */
  valueActTimeout = 50;
  /**
   * view parameter for Angular Material Slider {@link https://material.angular.io/components/slider/overview}
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
    this.baseMove = this.wizardStepperService.getWorkflowItem() as BaseMove;
    this.valueActTimeout = this.baseMove.activationTimeout;
    this.goalPose = this.baseMove.goalPose;
  }
  /**
   * overrides parent onNextClick() - updates all necessary variables and Observables
   * before redirects to next wizard job component
   */
  onNextClick(): void {
    this.baseMove.activationTimeout = this.valueActTimeout;
    this.wizardStepperService.updateWorkflowItem(this.baseMove);
    if (this.counter < this.workflow.getJobsLength() - 1) {
      this.wizardStepperService.increaseCount();
      this.selectNextJob(this.workflow.getJobName(this.counter));
      this.router.navigate([this.link]);
    } else {
      this.wizardStepperService.updateCount(this.counter = 0);
      this.link = 'wizard/run';
      this.router.navigate([this.link]);
      this.eventEmitterService.onStepperNextClick();
      console.log('MoveBase onStepperNext wurde ausgeführt');
    }
  }
  /**
   * requests actual position form backend and stores the value
   */
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
