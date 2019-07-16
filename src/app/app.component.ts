import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'RobotTeachingv0';

  private avvMethods  = [];

  constructor(private http: HttpClient) {
  }


  doPostRequest() {
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
