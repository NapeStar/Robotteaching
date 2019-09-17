import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Workflow} from '../model/workflow.model';
import {Base} from '../model/base.model';

@Injectable({
  providedIn: 'root'
})
export class WizardStepperService {

  private counter: number;
  private counterListener = new Subject<number>();

  private workflow: Workflow;
  private workflowListener = new Subject<Workflow>();

  private jobs: string[] = [];
  private jobsUpdated = new Subject<string[]>();

  private status: string;
  private statusListener  = new Subject<string>();

  constructor() { }

  getWorkflowListener(): Observable<Workflow> {
    return  this.workflowListener.asObservable();
  }
  getWorkflow(): Workflow {
    return this.workflow;
  }
  getWorkflowItem(): Base {
    console.log(this.workflow.getCurrentJob(this.counter));
    return this.workflow.getCurrentJob(this.counter);
  }

  updateWorkflow(workflow: Workflow) {
    this.workflow = workflow;
    this.workflowListener.next(this.workflow);
    console.log(this.workflow);
  }

  updateWorkflowItem(item: Base) {
    this.workflow.updateJobs(item, this.counter);
    this.workflowListener.next(this.workflow);
  }

  getCounterListener(): Observable<number> {
    return this.counterListener.asObservable();
  }
  getCounter(): number {
    return this.counter;
  }
  increaseCount() {
    this.counterListener.next(++ this.counter);
  }

  decreaseCount() {
    this.counterListener.next(-- this.counter);
  }

  updateCount(counter: number) {
    this.counter = counter;
    this.counterListener.next(this.counter);
  }

  getJobsListener(): Observable<string[]> {
    return this.jobsUpdated.asObservable();
  }
  getJobs(): string[] {
    return this.jobs;
  }

  updateJob(jobs: string[]) {
    this.jobs = jobs;
    this.jobsUpdated.next([...this.jobs]);
  }

  getStatusListener(): Observable<string> {
    return this.statusListener.asObservable();
  }
  getStatus(): string {
    return this.status;
  }
  updateStatus(status: string) {
    this.status = status;
    this.statusListener.next(this.status);
  }

}
