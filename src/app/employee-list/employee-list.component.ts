import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/Employee';
import { EmployeeApiService } from '../service/employee-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  filters: string[] = [];

  constructor(private restService: EmployeeApiService) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.restService.getAllEmployees().subscribe((data) => {
      this.employees = [...data];
    });
  }

  deleteEmployee(employee: Employee) {
    this.restService.deleteEmployee(employee).subscribe(() => {
      this.employees = this.employees.filter((e) => e.id !== employee.id);
    });
  }

  shouldShowEmployee(index: number) {
    if (this.filters.length === 0) {
      return true;
    }

    const targetSkills = this.employees[index].skillSet;
    return this.filters.some((f) => targetSkills.includes(f)); // O(n²) is life
  }

  onFilterChanged(filters: string[]) {
    this.filters = filters;
  }
}
