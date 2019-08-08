import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Move} from './move.data';
import {Job} from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  response: any;
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

  getWorkflows(){
    return this.http.post('http://localhost:4000', {
      jsonrpc: '2.0',
      method: 'get_available_workflows',
      params: [3],
      id: '1'
    }, this.httpOptions);
  }

  //
  // getWorkflowsParsed(){
  //   this.jobs = this.getWorkflows().result.workflows;
  //   const array = JSON.parse((JSON.stringify(this.getWorkflows().result.workflows)));
  // }



}
