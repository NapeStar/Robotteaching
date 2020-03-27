import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
/**
 * This service is only used in available-jobs component.
 *
 * Requests available jobs (methods) from backend and
 */
@Injectable({
  providedIn: 'root'
})
export class JobsService {
  /**
   * locally stored response from backend in array
   */
  private _response: string[];
  /**
   * Subjects are both observer and observable.
   * here to share the response between components
   */
  private _responseListener = new Subject<string[]>();
  /**
   * constructor
   * @param {HttpClient} http Service for for communication with backend
   */
  constructor(private http: HttpClient) {
  }
  /**
   * requests available jobs (methods) from backend and store them locally and observable
   * @returns The list of available jobs (methods)
   */
  getJobsFromServer() {
    return this.http.post<{workflows: string[]}>('http://localhost:3000/RobotDataService/getAvailableJobs', null).subscribe(
      (responseData) => {
        this._response = responseData.workflows;
        this._responseListener.next([...this._response]);
        console.log(responseData);
      });
  }
  /**
   * Getter for responseListener
   * @returns The responseListener - list of available jobs
   */
  get responseListener(): Subject<string[]> {
    return this._responseListener;
  }
  /**
   * Getter for response
   * @returns The response - list of available jobs
   */
  get response(): string[] {
    return this._response;
  }
}
