import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Qualification } from '../model/Qualification';
import { EmployeeApiService } from '../service/employee-api.service';
import { Employee } from '../model/Employee';

@Component({
  selector: 'app-skill-selector',
  templateUrl: './skill-selector.component.html',
  styleUrls: ['./skill-selector.component.css'],
})
export class SkillSelectorComponent implements OnInit {
  @Input()
  selected: string[] = [];
  @Input()
  employee: Employee | null = null;

  @Output()
  selectionChanged = new EventEmitter<string[]>();

  options: Qualification[] = [];

  constructor(private restService: EmployeeApiService) {}

  ngOnInit() {
    this.fetchQualifications();
  }

  fetchQualifications() {
    this.restService.getAllQualifications().subscribe((data) => {
      this.options = [...data];
    });
  }

  isSelected(index: number) {
    const targetSkill = this.options[index].skill;
    const match = this.selected.find((skill: string) => {
      return skill === targetSkill;
    });
    return !!match;
  }

  addToSelected(index: number) {
    const newQualification = this.options[index];
    if (this.employee) {
      this.restService
        .addQualificationToEmployee(this.employee, newQualification)
        .subscribe((e) => {
          this.employee = e;
        });
    }
    this.selected.push(newQualification.skill);
    this.selectionChanged.emit(this.selected);
  }

  removeFromSelected(index: number) {
    const targetSkill = this.options[index].skill;
    const matchedIndex = this.selected.findIndex((skill: string) => {
      return skill === targetSkill;
    });

    if (matchedIndex === -1) {
      return;
    }

    if (this.employee) {
      this.restService
        .removeQualificationFromEmployee(this.employee, this.options[index])
        .subscribe((e) => {
          this.employee = e;
        });
    }

    this.selected.splice(matchedIndex, 1);
    this.selectionChanged.emit(this.selected);
  }

  onSkillAdded(qualification: Qualification) {
    this.options.push(qualification);
  }
}
