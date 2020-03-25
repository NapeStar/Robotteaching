import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Workflow} from '../model/workflow.model';
import {Base} from '../model/base.model';

/**
 * this service keeps
 * 1. workflow (list of jobs with all parameters)
 * 2. counter (index of current job in workflwo displayed)
 * 3. jobs (list of job names in workflow)
 *
 * synchronized
 */
@Injectable({
  providedIn: 'root'
})

export class WizardStepperService {
  /**
   * index of current displayed job
   */
  private counter: number;
  /**
   * listens current index of displayed job
   */
  private counterListener = new Subject<number>();

  /**
   * locally Workflow
   */
  private workflow: Workflow;
  /**
   * Workflow Listener
   */
  private workflowListener = new Subject<Workflow>();

  /**
   * name array jobs in workflow
   */
  private jobs: string[] = [];
  /**
   * listen to update of jobs array
   */
  private jobsUpdated = new Subject<string[]>();

  /**
   * which status
   */
  private status: string;
  /**
   * status listener
   */
  private statusListener  = new Subject<string>();

  /**
   * default constructor
   */
  constructor() { }
  /**
   * Getter for workflowListener from Observable
   * @returns The workflowListener from Observable
   */
  getWorkflowListener(): Observable<Workflow> {
    return  this.workflowListener.asObservable();
  }
  /**
   * Getter for locally stored workflow
   * @returns The locally stored workflow
   */
  getWorkflow(): Workflow {
    return this.workflow;
  }
  /**
   * @returns The locally stored "current" job in workflowlsit
   */
  getWorkflowItem(): Base {
    console.log(this.workflow.getCurrentJob(this.counter));
    return this.workflow.getCurrentJob(this.counter);
  }
  /**
   * Setter for local and observed workflow resp. workflowListener
   *  * @param {Workflow} workflow
   */
  updateWorkflow(workflow: Workflow) {
    this.workflow = workflow;
    this.workflowListener.next(this.workflow);
    console.log(this.workflow);
  }
  /**
   * Setter for local and observed jobs
   *  * @param {Base} item
   */
  updateWorkflowItem(item: Base) {
    this.workflow.updateJobs(item, this.counter);
    this.workflowListener.next(this.workflow);
  }
  /**
   * Getter for counterListener from Observable
   * @returns The counterListener from Observable
   */
  getCounterListener(): Observable<number> {
    return this.counterListener.asObservable();
  }
  /**
   * Getter for locally stored counter
   * @returns The locally stored counter
   */
  getCounter(): number {
    return this.counter;
  }
  /**
   * increases counterListener
   */
  increaseCount() {
    this.counterListener.next(++ this.counter);
  }
  /**
   * decreases counterListener
   */
  decreaseCount() {
    this.counterListener.next(-- this.counter);
  }
  /**
   * Setter for local and observed counter resp. counterListener
   *  * @param {number} counter
   */
  updateCount(counter: number) {
    this.counter = counter;
    this.counterListener.next(this.counter);
  }
  /**
   * Getter for jobsUpdated from Observable
   * @returns The jobsUpdated from Observable
   */
  getJobsListener(): Observable<string[]> {
    return this.jobsUpdated.asObservable();
  }
  /**
   * Getter for locally store jobs
   * @returns The locally stored jobs
   */
  getJobs(): string[] {
    return this.jobs;
  }
  /**
   * Setter for local and observed jobs resp. jobsUpdated
   * @param {string[]} jobs
   */
  updateJob(jobs: string[]) {
    this.jobs = jobs;
    this.jobsUpdated.next([...this.jobs]);
  }
  /**
   * Getter for statusListener from Observable
   * @returns The statusListener from Observable
   */
  getStatusListener(): Observable<string> {
    return this.statusListener.asObservable();
  }
  /**
   * Getter for locally stored status
   * @returns The locally stored status
   */
  getStatus(): string {
    return this.status;
  }
  /**
   * Setter for local and observed status
   *  * @param {string} status
   */
  updateStatus(status: string) {
    this.status = status;
    this.statusListener.next(this.status);
  }

}
