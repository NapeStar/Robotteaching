import { Injectable } from '@angular/core';
import {Job} from '../jobs/job.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardStepperService {

  private jobs: Job[] = [];
  private jobsUpdated = new Subject<Job[]>();

  constructor() { }

  getJobs(): Observable<Job[]> {
    // this.updateJob([...this.jobs]);
    return this.jobsUpdated.asObservable();
  }

  getJobs2(): Job[] {
    console.log(this.jobs);
    return this.jobs;
  }

  updateJob(jobs: Job[]) {
    this.jobs = jobs;
    console.log(this.jobs);
    this.jobsUpdated.next([...this.jobs]);
  }

}
