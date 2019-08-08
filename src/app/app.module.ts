import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AvailableJobsComponent } from './jobs/available-jobs/available-jobs.component';
import { ChoosenJobsComponent } from './jobs/choosen-jobs/choosen-jobs.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from '@angular/router';
import { StartingPageJobsComponent } from './jobs/starting-page-jobs/starting-page-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    AvailableJobsComponent,
    ChoosenJobsComponent,
    HeaderComponent,
    StartingPageJobsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
