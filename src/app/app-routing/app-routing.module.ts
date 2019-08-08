import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AvailableJobsComponent} from '../jobs/available-jobs/available-jobs.component';
import {ChoosenJobsComponent} from '../jobs/choosen-jobs/choosen-jobs.component';
import {StartingPageJobsComponent} from '../jobs/starting-page-jobs/starting-page-jobs.component';

const routes: Routes = [
  {path: 'get', component: StartingPageJobsComponent},
  {path: 'orf', component: ChoosenJobsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
