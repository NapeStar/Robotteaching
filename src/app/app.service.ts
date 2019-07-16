import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Action} from './app.action';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class HeroesService {
  heroesUrl = 'api/heroes';  // URL to web api

  private avvMethods  = [];


  constructor(
    private http: HttpClient) {

  }

  oPostRequest() {
    const req = this.http.post('http://localhost:4000', {
      title: 'foo',
      body: 'bar',
      userId: 1
    })
      .subscribe(
        (res: any[]) => {
          console.log(res);
          this.avvMethods = res;
        },
        err => {
          console.log("Error occured");
        }
      );
  }

}
