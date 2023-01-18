import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthGuard } from './security/auth.guard';
import { QualificationListComponent } from './qualification-list/qualification-list.component';
import { CreateOrEditEmployeeComponent } from './create-or-edit-employee/create-or-edit-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch: 'full' },
  {
    path: 'employee',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/create',
    component: CreateOrEditEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/:id',
    component: CreateOrEditEmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'qualification',
    component: QualificationListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
