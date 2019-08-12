import { Injectable } from '@angular/core';
import {Job} from '../jobs/job.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardStepperService {

  private counter: number;
  private counterListener = new Subject<number>();

  private jobs: Job[] = [];
  private jobsUpdated = new Subject<Job[]>();

  constructor() { }

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

  getJobs2(): Job[] {
    return this.jobs;
  }

  updateJob(jobs: Job[]) {
    this.jobs = jobs;
    this.jobsUpdated.next([...this.jobs]);
  }

}
