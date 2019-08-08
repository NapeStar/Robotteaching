import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Job } from './job.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Jobs2Service {

  private jobs: Job[] = [];
  private jobsUpdated = new Subject<Job[]>();

  constructor(private http: HttpClient) {
  }

  getJobs() {
    this.http.get<{ jobs: Job[] }>('http://localhost:3000')
      .subscribe((jobData) => {
        this.jobs = jobData.jobs;
        this.jobsUpdated.next([...this.jobs]);
      });
  }

  getJobsUpdateListener() {
    return this.jobsUpdated.asObservable();
  }

  saveJobs(jobs: Job[]) {
    this.http.post<{ message: string }>('http://localhost:3000/saveWorkflow', jobs)
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
}
