import { Injectable } from '@angular/core';
import {Job} from '../jobs/job.model';

@Injectable({
  providedIn: 'root'
})
export class WizardStepperService {

  selectedJobs: Job[] = [];
  remainingJobs: Job[] = [];

  constructor() { }

  getSelectedJobs(): Job[] {
      return this.selectedJobs;
  }

  setSelectedJobs(jobs: Job[]) {
      this.selectedJobs = [...jobs];
  }

  getRemainingJobs(): Job[] {
      return this.remainingJobs;
  }

  getNextJob() {
    return this.remainingJobs.reverse().pop();
  }
  addJob(job: Job) {
    this.remainingJobs.reverse().push(job);
  }

  updateRemainingJobs(jobs: Job[]) {
    this.remainingJobs = [...jobs];
  }

}
