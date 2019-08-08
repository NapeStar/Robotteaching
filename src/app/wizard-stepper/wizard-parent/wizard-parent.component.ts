import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard-parent',
  templateUrl: './wizard-parent.component.html',
  styleUrls: ['./wizard-parent.component.css']
})
export class WizardParentComponent implements OnInit {

  title = 'Workflow Wizard';
  constructor() { }

  ngOnInit() {
  }

}
