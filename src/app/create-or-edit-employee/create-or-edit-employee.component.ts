import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../model/Employee';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-create-or-edit-employee',
  templateUrl: './create-or-edit-employee.component.html',
  styleUrls: ['./create-or-edit-employee.component.css'],
})
export class CreateOrEditEmployeeComponent implements OnInit {
  id = 0;
  isEditMode = false;
  employee: Employee = new Employee();
  routeSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: RestService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id) {
        this.isEditMode = true;
        this.restService.getEmployee(this.id).subscribe((employee) => {
          this.employee = employee;
        });
      } else {
        this.isEditMode = false;
      }
    });
  }

  save() {
    if (this.isEditMode) {
      this.restService.editEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employee']);
      });
    } else {
      this.restService.addEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employee']);
      });
    }
  }
}
