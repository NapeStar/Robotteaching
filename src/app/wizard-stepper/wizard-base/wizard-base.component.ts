import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper.service';
import {WizardJobComponent} from '../wizard-job/wizard-job.component';
import {BaseMove} from '../../model/base-move.model';
import {WizardParentStepperService} from '../wizard-parent/wizard-parent-stepper.service';

@Component({
  selector: 'app-wizard-base',
  templateUrl: './wizard-base.component.html',
  styleUrls: ['./wizard-base.component.css']
})
export class WizardBaseComponent extends WizardJobComponent implements OnInit, OnDestroy {

  title = 'Base Movement';

  baseMove = new BaseMove();

  // slider Activation timout
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
              wizardStepperService: WizardStepperService,
              eventEmitterService: WizardParentStepperService) {
    super(router, wizardStepperService, eventEmitterService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.baseMove = this.wizardStepperService.getWorkflowItem() as BaseMove;
    this.valueActTimeout = this.baseMove.activationTimeout;
  }

  onNextClick(): void {
    this.baseMove.activationTimeout = this.valueActTimeout;
    this.wizardStepperService.updateWorkflowItem(this.baseMove);
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
  onSavePoseClick(): void {
    this.baseMove.goalPose = [1, 1, 1, 1, 1, 1, 1];
    this.isDisabledNext = false;
  }
  }
