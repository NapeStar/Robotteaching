import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'RobotTeachingv0';

   avvMethods  = [];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',

      'jsonrpc':'2.0',
      'user':'intern',
      'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2JvdElkIjoiY2hpbWVyYTEiLCJle' +
        'HBpcmVzIjozMTUzNjAwMH0.fPubN5HhuKhmg0o8gL5NA7TCNbtLdL6FxkG_B8A3U1s'

    })
  };


  constructor(private http: HttpClient) {
  }


  doPostRequest() {
    const req = this.http.post('http://localhost:4000', {
      "jsonrpc":"2.0",
      "method":"get_service_description",
      "params":[3],
      "id": 1
    },this.httpOptions)
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
