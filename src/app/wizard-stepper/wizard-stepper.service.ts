import { Injectable } from '@angular/core';
import {Job} from '../jobs/job.model';
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

  private jobs: Job[] = [];
  private jobsUpdated = new Subject<Job[]>();

  constructor() { }

  getWorkflowListener(): Observable<Workflow> {
    return  this.workflowListener.asObservable();
  }
  getWorkflow(): Workflow {
    return this.workflow;
  }
  getWorkflowItem(): Base {
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

  getJobsListener(): Observable<Job[]> {
    return this.jobsUpdated.asObservable();
  }
  getJobs(): Job[] {
    return this.jobs;
  }

  updateJob(jobs: Job[]) {
    this.jobs = jobs;
    this.jobsUpdated.next([...this.jobs]);
  }

}
