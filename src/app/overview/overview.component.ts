import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WizardStepperService} from '../wizard-stepper/wizard-stepper.service';
import {HttpClient} from '@angular/common/http';
import {HttpRequestService} from '../execution/http-request.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(protected router: Router,
              private httpRequest: HttpRequestService) { }

  ngOnInit() {
    this.httpRequest.getAllWorkflows();
  }

}
