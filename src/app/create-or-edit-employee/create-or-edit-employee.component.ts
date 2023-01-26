import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/Employee';
import { EmployeeApiService } from '../service/employee-api.service';

@Component({
  selector: 'app-create-or-edit-employee',
  templateUrl: './create-or-edit-employee.component.html',
})
export class CreateOrEditEmployeeComponent implements OnInit {
  id = 0;
  isEditMode = false;
  employee: Employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restService: EmployeeApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
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

  onSkillSetChanged(skillSet: string[]) {
    this.employee.skillSet = skillSet;
  }
}
