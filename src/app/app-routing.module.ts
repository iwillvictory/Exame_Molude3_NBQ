import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartmentComponent} from './department/department.component';
import {EmployeeComponent} from './employee/employee.component';
import {BookComponent} from "./book/book.component";


const routes: Routes = [
  {path: '', component: BookComponent },
  {path: 'bookList', component: BookComponent },
  {path: 'employee', component: EmployeeComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
