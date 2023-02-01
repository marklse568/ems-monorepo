import { Component, OnInit } from '@angular/core';
import { EmployeeApiService } from '../service/employee-api.service';
import { Qualification } from '../model/Qualification';
import { EmployeesByQualification } from '../model/EmployeesByQualification';

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
})
export class QualificationListComponent implements OnInit {
  qualifications: Qualification[] = [];
  selectedQualification = '';
  employeesByQualification: EmployeesByQualification | null = null;

  constructor(private restService: EmployeeApiService) {}

  ngOnInit() {
    this.restService.getAllQualifications().subscribe((data) => {
      this.qualifications = [...data];
    });
  }

  onSkillAdded(qualification: Qualification) {
    this.qualifications.push(qualification);
  }

  onDelete(qualification: Qualification) {
    this.restService.deleteQualification(qualification).subscribe(() => {
      this.qualifications = this.qualifications.filter(
        (q) => q.skill !== qualification.skill
      );
    });
  }

  onShowEmployees(qualification: Qualification) {
    this.restService
      .getAllEmployeesByQualification(qualification)
      .subscribe((data) => {
        this.selectedQualification = qualification.skill;
        this.employeesByQualification = data;
      });
  }
}
