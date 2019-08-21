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

  title = 'Gripper Grip';

  gripperGrip = new GripperGrip();

  disabledActTimeout = false;
  invertActTimeout = false;
  maxActTimeout = 100;
  minActTimeout = 0;
  stepActTimeout = 1;
  thumbLabelActTimeout = true;
  valueActTimeout = 50;
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
    if (this.counter < this.jobsUpdated.length - 1) {
      this.wizardStepperService.increaseCount();
      this.selectNextJob(this.jobsUpdated[this.counter]);
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
