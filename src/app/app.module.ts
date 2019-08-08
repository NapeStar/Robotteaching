import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule, MatDividerModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {coerceNumberProperty} from '@angular/cdk/coercion';

import { AppComponent } from './app.component';
import { AvailableJobsComponent } from './jobs/available-jobs/available-jobs.component';
import { ChoosenJobsComponent } from './jobs/choosen-jobs/choosen-jobs.component';
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

@NgModule({
  declarations: [
    AppComponent,
    AvailableJobsComponent,
    ChoosenJobsComponent,
    HeaderComponent,
    NoPageFoundComponent,
    WizardParentComponent,
    WizardGripperGripComponent,
    WizardGripperReleaseComponent,
    WizardArmTrajectoryComponent,
    WizardArmJoinsComponent,
    WizardArmCartesianComponent,
    WizardBaseComponent,
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
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
