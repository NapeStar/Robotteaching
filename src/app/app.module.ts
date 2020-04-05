import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule, MatDividerModule, MatIconModule, MatListModule, MatTableModule, MatProgressSpinnerModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatStepperModule} from '@angular/material/stepper';
import { FormGroup} from '@angular/forms';

import { AppComponent } from './app.component';
import { AvailableJobsComponent } from './jobs/available-jobs/available-jobs.component';
import { HeaderComponent } from './header/header.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { WizardParentComponent } from './wizard-stepper/wizard-parent/wizard-parent.component';
import { WizardGripperGripComponent } from './wizard-stepper/wizard-gripper-grip/wizard-gripper-grip.component';
import { MatSliderModule } from '@angular/material/slider';
import { WizardGripperReleaseComponent } from './wizard-stepper/wizard-gripper-release/wizard-gripper-release.component';
import { WizardArmTrajectoryComponent} from './wizard-stepper/wizard-arm-trajectory/wizard-arm-trajectory.component';
import { WizardArmJoinsComponent } from './wizard-stepper/wizard-arm-joins/wizard-arm-joins.component';
import { WizardArmCartesianComponent } from './wizard-stepper/wizard-arm-cartesian/wizard-arm-cartesian.component';
import { WizardBaseComponent } from './wizard-stepper/wizard-base/wizard-base.component';
import {WizardStepperService} from './wizard-stepper/wizard-stepper.service';
import { WizardJobComponent } from './wizard-stepper/wizard-job/wizard-job.component';
import { ExecutionRunComponent } from './execution/execution-run/execution-run.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { WorkflowTableComponent } from './workflow-table/workflow-table.component';
import {SocketDataService} from './sockets/websocket.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import { WizardNewMethodComponent } from './wizard-stepper/wizard-new-method/wizard-new-method.component';
import { EnvironmentUrlService} from './environment-url.service';

@NgModule({
  declarations: [
    AppComponent,
    AvailableJobsComponent,
    HeaderComponent,
    NoPageFoundComponent,
    WizardParentComponent,
    WizardGripperGripComponent,
    WizardGripperReleaseComponent,
    WizardArmTrajectoryComponent,
    WizardArmJoinsComponent,
    WizardArmCartesianComponent,
    WizardBaseComponent,
    WizardJobComponent,
    ExecutionRunComponent,
    WorkflowTableComponent,
    WizardNewMethodComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSliderModule,
    MatDividerModule,
    FlexLayoutModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    ScrollingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule
  ],
  providers: [WizardStepperService, SocketDataService, EnvironmentUrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
