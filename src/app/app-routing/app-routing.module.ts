import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AvailableJobsComponent } from '../jobs/available-jobs/available-jobs.component';
import { NoPageFoundComponent } from '../no-page-found/no-page-found.component';
import { WizardParentComponent } from '../wizard-stepper/wizard-parent/wizard-parent.component';
import { WizardGripperGripComponent } from '../wizard-stepper/wizard-gripper-grip/wizard-gripper-grip.component';
import {WizardGripperReleaseComponent} from '../wizard-stepper/wizard-gripper-release/wizard-gripper-release.component';
import {WizardArmTrajectoryComponent} from '../wizard-stepper/wizard-arm-trajectory/wizard-arm-trajectory.component';
import {WizardArmJoinsComponent} from '../wizard-stepper/wizard-arm-joins/wizard-arm-joins.component';
import {WizardArmCartesianComponent} from '../wizard-stepper/wizard-arm-cartesian/wizard-arm-cartesian.component';
import {WizardBaseComponent} from '../wizard-stepper/wizard-base/wizard-base.component';
import {ExecutionRunComponent} from '../execution/execution-run/execution-run.component';
import {WorkflowTableComponent} from '../workflow-table/workflow-table.component';
/**
 * you must import new method component
 */
import {WizardNewMethodComponent} from '../wizard-stepper/wizard-new-method/wizard-new-method.component';
/**
 * you must add the path "new_method" and connnect to component "WizardNewMethodComponent"
 */
const routes: Routes = [
  {path: 'workflows_table', component: WorkflowTableComponent},
  {path: '', redirectTo: '/workflows_table', pathMatch: 'full'},
  {path: 'jobs', component: AvailableJobsComponent},
  {path: 'wizard', component: WizardParentComponent,
    children: [{
        path: 'new_method_path',
        component: WizardNewMethodComponent
      },
      {
        path: 'gripper_grip',
        component: WizardGripperGripComponent
      },
      {
        path: 'gripper_release',
        component: WizardGripperReleaseComponent
      },
      {
        path: 'arm_trajectory',
        component: WizardArmTrajectoryComponent
      },
      {
        path: 'arm_joints',
        component: WizardArmJoinsComponent
      },
      {
        path: 'arm_cartesian',
        component: WizardArmCartesianComponent
      },
      {
        path: 'base',
        component: WizardBaseComponent
      },
      {
        path: 'run',
        component: ExecutionRunComponent
      }
    ]
  },
  {path: '**', component: NoPageFoundComponent}
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
