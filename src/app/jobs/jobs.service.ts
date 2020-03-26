import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private _response: string[];
  private _responseListener = new Subject<string[]>();

  constructor(private http: HttpClient) {
  }

  getJobsFromServer() {
    return this.http.post<{workflows: string[]}>('http://localhost:3000/RobotDataService/getAvailableJobs', null).subscribe(
      (responseData) => {
        this._response = responseData.workflows;
        this._responseListener.next([...this._response]);
        console.log(responseData);
        // console.log(this._response);
      });
  }
  get responseListener(): Subject<string[]> {
    return this._responseListener;
  }

  get response(): string[] {
    return this._response;
  }
}
