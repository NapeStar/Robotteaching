import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Move} from './move.data';
import {Job} from './job.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private _response: string[];
  private _responseListener = new Subject<string[]>();

  jobs: Job[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',

      jsonrpc: '2.0',
      user: 'intern',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2JvdElkIjoiY2hpbWVyYTEiLCJle' +
        'HBpcmVzIjozMTUzNjAwMH0.fPubN5HhuKhmg0o8gL5NA7TCNbtLdL6FxkG_B8A3U1s'
    })
  };

  constructor(private http: HttpClient) {
  }

  getWorkflows() {
    return this.http.post('http://localhost:4000', {
      jsonrpc: '2.0',
      method: 'get_available_workflows',
      params: [3],
      id: '1'
    }, this.httpOptions);
  }

  getJobsFromServer() {
    return this.http.post<{workflows: string[]}>('http://localhost:3000/RobotDataService/getAvailableJobs', null).subscribe(
      (responseData) => {
        this._response = responseData.workflows;
        this._responseListener.next([...this._response]);
        // console.log(responseData);
        // console.log(this._response);
      });
  }
  get responseListener(): Subject<string[]> {
    return this._responseListener;
  }

  get response(): string[] {
    return this._response;
  }

//
  // getWorkflowsParsed(){
  //   this.jobs = this.getWorkflows().result.workflows;
  //   const array = JSON.parse((JSON.stringify(this.getWorkflows().result.workflows)));
  // }
}
