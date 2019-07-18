import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{


  httpResult: Object;


  constructor(private data: DataService) {
  }

  ngOnInit(): void {

  }

  dataClick(){
    this.data.getWorkflows().subscribe(data => {
      this.httpResult = data
      console.log(this.httpResult)

  });

  }

}
