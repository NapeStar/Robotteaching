import { Component, OnInit } from '@angular/core';
import { AvailableJobsComponent } from '../../jobs/available-jobs/available-jobs.component';

@Component({
  selector: 'app-wizard-gripper-release',
  templateUrl: './wizard-gripper-release.component.html',
  styleUrls: ['./wizard-gripper-release.component.css']
})
export class WizardGripperReleaseComponent implements OnInit {
  title = 'Gripper Release';

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 50;
  vertical = false;

  constructor() { }

  ngOnInit() {
  }

  onNextClick() {
  //   if (this.copiedJobs.length > 0) {
  //     this.selecetNextJob();
  //     console.log(this.link);
  //     this.router.navigate([this.link]);
  //   } else {
  //     alert('no jobs selected');
  //   }
  //   console.log(this.copiedJobs.length);
  }

}
