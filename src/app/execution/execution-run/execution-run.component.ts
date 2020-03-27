import {Component, OnDestroy, OnInit} from '@angular/core';
// import {JobsService} from '../../jobs/jobs.service';
import {Router} from '@angular/router';
import {WizardStepperService} from '../../wizard-stepper/wizard-stepper.service';
import {WizardJobComponent} from '../../wizard-stepper/wizard-job/wizard-job.component';
// import {Workflow} from '../../model/workflow.model';
// import {Subscription} from 'rxjs';
import {HttpRequestService} from '../http-request.service';
import {HttpClient} from '@angular/common/http';
// import {Output, EventEmitter} from '@angular/core';
import {WizardParentStepperService} from '../../wizard-stepper/wizard-parent/wizard-parent-stepper.service';
// import {createElementCssSelector} from '@angular/compiler';
import {SocketDataService} from '../../sockets/websocket.service';
import {NgxSpinnerService} from 'ngx-spinner';

/**
 * This component shows the configurated workflow and list all containing jobs.
 *
 * It communicates with backend for saving, updating, and executing the workflow
 */
@Component({
  selector: 'app-execution-run',
  templateUrl: './execution-run.component.html',
  styleUrls: ['./execution-run.component.css']
})
export class ExecutionRunComponent extends WizardJobComponent implements OnInit, OnDestroy {

  /**
   * before workflow ist not saved run button not displayed
   */
  isDisabledRun = true;
  /**
   * status if already saved in backend
   */
  isAlreadySave = false;
  // isLoading = false;
  workflowProgress = 0;
  /**
   * displayed text of spinner
   */
  spinnerText: string;
  /**
   * status for spinner
   */
  displaySpinner = false;
  /**
   * massage for websocket
   */
  message: string;
  // messages: string[] = [];
  // connection;

  /**
   * constructor - calls constructor of parent WizardJobComponent
   * @param {Router} router For redirecting
   * @param {WizardStepperService} wizardStepperService For Sharing Workflow Information
   * @param {HttpRequestService} httpRequest For getting actual position from robot arm
   * @param {WizardParentStepperService} eventEmitterService For Sharing Angular Material Stepper View
   * @param {SocketDataService} SocketDataService For getting actual progress from backend
   * @param {NgxSpinnerService} spinner For Progress Spinner
   */
  constructor(protected router: Router,
              protected wizardStepperService: WizardStepperService,
              private http: HttpClient,
              private httpRequest: HttpRequestService,
              protected eventEmitterService: WizardParentStepperService,
              // tslint:disable-next-line:no-shadowed-variable
              private SocketDataService: SocketDataService,
              private spinner: NgxSpinnerService
  ) {
    super(router, wizardStepperService, eventEmitterService);
  }
  /**
   * ngOnInit is a lifecycle hook - executed after constructor
   *
   * overrides parent ngOninit() declares additional necessary variables for this component (WebSocket for Spinner)
   */
  ngOnInit() {
    super.ngOnInit();
    this.SocketDataService.onNewMessage().subscribe(msg => {
      console.log('Workflow Progress: ' + msg);
      this.setWorkflowProgress(msg);
    });
  }
  /**
   * activates spinner in view
   */
  showSpinner() {
    this.spinner.show();
  }
  /**
   * hides spinner in view
   */
  hideSpinner(){
    this.spinner.hide();
  }
  /**
   * Sets worflowProgess for spinner
   * @param {any} msg
   */
  setWorkflowProgress(msg) {
    this.workflowProgress = parseInt(msg, 10);
    this.spinnerText = 'Executing Workflow! Finished: ' + this.workflowProgress +' %';
    if (this.workflowProgress === 100) {
      this.hideSpinner();
      this.workflowProgress = 0;
    }
  }
  /**
   * When clicked on Play button.
   * Activates spinner,
   * communicates with backend -> send execution request and
   * ask for progress via socket
   */
  runOnClick() {
    this.showSpinner();
    this.spinnerText = 'Executing Workflow! Finished: 0%';
    this.SocketDataService.sendMessage(this.workflow.name);
    this.httpRequest.updateWorkflow(this.workflow);
    setTimeout(() => {
      this.httpRequest.runWorkflow();
      this.eventEmitterService.onStepperNextClick();
      console.log('Next wurde ausgeführt');
      console.log('Hello from setTimeout');
    }, 5000);
  }
  /**
   * When 1st creation und clicked on Save button.
   * Communicates with backend -> send workflow to be saved and
   * receives workflow ID from backend
   */
  saveCreateOnClick() {
    this.eventEmitterService.onStepperNextClick();
    this.isDisabledRun = false;
    if (this.isAlreadySave === false) {
      this.httpRequest.createWorkflow(this.workflow);
      this.isAlreadySave = true;
    } else {
    }
    console.log('Next Create wurde ausgeführt');
  }
  /**
   * When already stored Workflow and clicked on Save button.
   * Communicates with backend -> send workflow to be updated and
   */
  saveUpdateOnClick() {
    this.eventEmitterService.onStepperNextClick();
    this.isDisabledRun = false;
    if (this.isAlreadySave === false) {
      this.httpRequest.updateWorkflow(this.workflow);
      this.isAlreadySave = true;
    } else {
    }
    console.log('Next Update wurde ausgeführt');
  }
  /**
   * When 1st creation and clicked on Back button.
   *
   * redirects accordingly and reset counter
   */
  backCreateOnClick() {
    this.eventEmitterService.onStepperBackClick();
    this.selectNextJob(this.workflow.getJobName(this.counter));
    this.router.navigate([this.link]);
    console.log('Back Create wurde ausgeführt');
  }
  /**
   * When updated Workflow and clicked on Back button.
   *
   * redirects accordingly and reset counter
   */
  backUpdateOnClick() {
    this.eventEmitterService.onStepperBackClick();
    this.selectNextJob(this.workflow.getJobName(this.counter));
    this.router.navigate([this.link]);
    console.log('Back Update wurde ausgeführt');
  }
  /**
   * When executing Workflow and clicked on Back button.
   *
   * redirects accordingly and reset counter
   */
  backRunOnClick() {
    this.link = '';
    this.router.navigate([this.link]);
  }
}
