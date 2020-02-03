import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobsService} from '../../jobs/jobs.service';
import {Router} from '@angular/router';
import {WizardStepperService} from '../../wizard-stepper/wizard-stepper.service';
import {WizardJobComponent} from '../../wizard-stepper/wizard-job/wizard-job.component';
import {Workflow} from '../../model/workflow.model';
import {Subscription} from 'rxjs';
import {Job} from '../../jobs/job.model';
import {HttpRequestService} from '../http-request.service';
import {HttpClient} from '@angular/common/http';
import {Output, EventEmitter} from '@angular/core';
import {WizardParentStepperService} from '../../wizard-stepper/wizard-parent/wizard-parent-stepper.service';
import {createElementCssSelector} from '@angular/compiler';
import {SocketDataService} from '../../sockets/websocket.service';


@Component({
  selector: 'app-execution-run',
  templateUrl: './execution-run.component.html',
  styleUrls: ['./execution-run.component.css']
})
export class ExecutionRunComponent extends WizardJobComponent implements OnInit, OnDestroy {

  isDisabledRun = true;
  isAlreadySave = false;
  isLoading = true;
  workflowProgress = 0;

  message: string;
  messages: string[] = [];
  connection;
  // status: string;
  // private statusSub: Subscription;

  constructor(protected router: Router,
              protected wizardStepperService: WizardStepperService,
              private http: HttpClient,
              private httpRequest: HttpRequestService,
              protected eventEmitterService: WizardParentStepperService,
              private SocketDataService: SocketDataService
  ) {
    super(router, wizardStepperService, eventEmitterService);
  }

  ngOnInit() {
    super.ngOnInit();
    // this.statusSub = this.wizardStepperService.getStatusListener()
    //     .subscribe(data => {
    //       this.status = data;
    //       console.log(this.status);
    //     });
    // this.status = this.wizardStepperService.getStatus();
    // console.log(this.status);

    this.SocketDataService.onNewMessage().subscribe(msg => {
      console.log('Workflow Progress: ' + msg);
      this.setWorkflowProgress(msg);
    });


    /*
        this.SocketDataService
          .getMessages()
          .subscribe((message: string) => {
            console.log("HAPPPP");
            this.messages.push(message);
          });


     */
  }


  setWorkflowProgress(msg) {

    this.workflowProgress = parseInt(msg, 10);
  }

  runOnClick() {

    this.SocketDataService.sendMessage(this.workflow.name);
    this.httpRequest.updateWorkflow(this.workflow);
    setTimeout(() => {
      this.httpRequest.runWorkflow();
      this.eventEmitterService.onStepperNextClick();
      console.log('Next wurde ausgeführt');
      console.log('Hello from setTimeout');
    }, 5000);


    // this.httpRequest.runWorkflow();
    // this.eventEmitterService.onStepperNextClick();
    // console.log('Next wurde ausgeführt');
  }

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

  backCreateOnClick() {
    this.eventEmitterService.onStepperBackClick();
    this.selectNextJob(this.workflow.getJobName(this.counter));
    this.router.navigate([this.link]);
    console.log('Back Create wurde ausgeführt');
  }

  backUpdateOnClick() {
    this.eventEmitterService.onStepperBackClick();
    this.selectNextJob(this.workflow.getJobName(this.counter));
    this.router.navigate([this.link]);
    console.log('Back Update wurde ausgeführt');
  }

  backRunOnClick() {
    this.link = '';
    this.router.navigate([this.link]);
  }
}
