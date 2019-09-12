import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WorkflowListElement} from '../model/workflow-list-element.model';
import {Subscription} from 'rxjs';
import {HttpRequestService} from '../execution/http-request.service';


@Component({
  selector: 'app-workflow-table',
  templateUrl: './workflow-table.component.html',
  styleUrls: ['./workflow-table.component.css']
})
export class WorkflowTableComponent implements OnInit {

  workflowList: WorkflowListElement[] = [];
  private workflowListSub: Subscription;

  displayedColumns: string[] = ['id', 'name', 'created', 'action'];
  dataSource = this.workflowList;

  constructor(protected router: Router,
              private httpRequest: HttpRequestService) { }

  ngOnInit() {this.httpRequest.getAllWorkflows();
              this.httpRequest.getWorkflowListUpdateListener()
                .subscribe((workflowList: WorkflowListElement[]) => {
        this.workflowList = workflowList;
        this.dataSource = this.workflowList;
    });
  }

  addNew(): void {
    this.router.navigate(['jobs']);
  }

}
