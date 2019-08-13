import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';
import {GripperRelease} from '../../model/gripper-release.model';
import {GripperGrip} from '../../model/gripper-grip.model';

@Component({
  selector: 'app-wizard-gripper-release',
  templateUrl: './wizard-gripper-release.component.html',
  styleUrls: ['./wizard-gripper-release.component.css']
})
export class WizardGripperReleaseComponent extends WizardJobComponent implements OnInit, OnDestroy {
  title = 'Gripper Release';

  gripperRelease = new GripperRelease();

  disabledActTimeout = false;
  invertActTimeout = false;
  maxActTimeout = 100;
  minActTimeout = 0;
  stepActTimeout = 1;
  thumbLabelActTimeout = true;
  valueActTimeout = 50;
  verticalActTimeout = false;

  constructor(router: Router,
              wizardStepperService: WizardStepperService) {
    super(router, wizardStepperService);
  }
  ngOnInit() {
    super.ngOnInit();
    this.gripperRelease = this.wizardStepperService.getWorkflowItem() as GripperRelease;
    this.valueActTimeout = this.gripperRelease.activationTimeout;
  }
  onNextClick(): void {
    this.gripperRelease.activationTimeout = this.valueActTimeout;
    this.wizardStepperService.updateWorkflowItem(this.gripperRelease);
    if (this.counter < this.jobsUpdated.length - 1) {
      this.wizardStepperService.increaseCount();
      this.selectNextJob(this.jobsUpdated[this.counter]);
      this.router.navigate([this.link]);
    } else {
      this.wizardStepperService.updateCount(this.counter = 0);
      this.link += 'run';
      this.router.navigate([this.link]);
    }
  }

}
