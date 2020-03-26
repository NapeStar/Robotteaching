import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';
import {GripperGrip} from '../../model/gripper-grip.model';
import {ArmCartesian} from '../../model/arm-cartesian.model';
import {WizardParentStepperService} from '../wizard-parent/wizard-parent-stepper.service';

@Component({
  selector: 'app-wizard-gripper-grip',
  templateUrl: './wizard-gripper-grip.component.html',
  styleUrls: ['./wizard-gripper-grip.component.css']
})
export class WizardGripperGripComponent extends WizardJobComponent implements OnInit, OnDestroy {
  /**
   * displayed titel of the component
   */
  title = 'Gripper Grip';
  /**
   * local instance of GripperGrip
   */
  gripperGrip: GripperGrip;
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

  constructor(router: Router,
              wizardStepperService: WizardStepperService,
              eventEmitterService: WizardParentStepperService) {
    super(router, wizardStepperService, eventEmitterService);
  }
  ngOnInit() {
    super.ngOnInit();
    this.gripperGrip = this.wizardStepperService.getWorkflowItem() as GripperGrip;
    this.valueActTimeout = this.gripperGrip.activationTimeout;
  }
  onNextClick(): void {
    this.gripperGrip.activationTimeout = this.valueActTimeout;
    this.wizardStepperService.updateWorkflowItem(this.gripperGrip);
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
      console.log('GripperGrip onStepperNext wurde ausgeführt');
    }
  }
}
