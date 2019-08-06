import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {DragDropModule} from '@angular/cdk/drag-drop';


import { AppComponent } from './app.component';
import { AvailableJobsComponent } from './jobs/availableJobs/availableJobs.component';
import { ChoosenJobsComponent } from './jobs/choosen-jobs/choosen-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    AvailableJobsComponent,
    ChoosenJobsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
