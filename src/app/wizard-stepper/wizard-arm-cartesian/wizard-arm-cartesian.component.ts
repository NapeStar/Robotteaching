import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';
import {ArmCartesian} from '../../model/arm-cartesian.model';
import {BaseMove} from '../../model/base-move.model';

@Component({
  selector: 'app-wizard-arm-cartesian',
  templateUrl: './wizard-arm-cartesian.component.html',
  styleUrls: ['./wizard-arm-cartesian.component.css']
})
export class WizardArmCartesianComponent extends WizardJobComponent implements OnInit,  OnDestroy {


  title = 'Arm Cartesian';

  armCartesian = new ArmCartesian();

  disabledActTimeout = false;
  invertActTimeout = false;
  maxActTimeout = 100;
  minActTimeout = 0;
  stepActTimeout = 1;
  thumbLabelActTimeout = true;
  valueActTimeout = 50;
  verticalActTimeout = false;

  // mat-button next
  isDisabledNext = true;


  constructor(router: Router,
              wizardStepperService: WizardStepperService) {
    super(router, wizardStepperService);
  }
  ngOnInit() {
    super.ngOnInit();
    this.armCartesian = this.wizardStepperService.getWorkflowItem() as ArmCartesian;
    this.valueActTimeout = this.armCartesian.activationTimeout;
  }
  onNextClick(): void {
    this.armCartesian.activationTimeout = this.valueActTimeout;
    this.wizardStepperService.updateWorkflowItem(this.armCartesian);
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
  onSavePoseClick(): void {
    this.armCartesian.goalPose = [1, 1, 1, 1, 1, 1, 1];
    this.isDisabledNext = false;
  }
}
