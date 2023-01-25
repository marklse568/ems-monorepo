import { Component, Input, OnInit, Output } from '@angular/core';
import { Qualification } from '../model/Qualification';
import { EmployeeApiService } from '../service/employee-api.service';
import { ToastPosition, ToastType } from '../model/Toast';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-skill-selector',
  templateUrl: './skill-selector.component.html',
  styleUrls: ['./skill-selector.component.css'],
})
export class SkillSelectorComponent implements OnInit {
  @Output()
  @Input()
  selected: Qualification[] = [];
  options: Qualification[] = [];
  newSkillName = '';

  constructor(
    private restService: EmployeeApiService,
    private toaster: ToastService
  ) {}

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
    const match = this.selected.find((selectedQualification: Qualification) => {
      return selectedQualification.skill === targetSkill;
    });
    return !!match;
  }

  addToSelected(index: number) {
    this.selected.push(this.options[index]);
  }

  removeFromSelected(index: number) {
    const targetSkill = this.options[index].skill;
    const matchedIndex = this.selected.findIndex(
      (selectedQualification: Qualification) => {
        return selectedQualification.skill === targetSkill;
      }
    );

    this.selected.splice(matchedIndex, 1);
  }

  addNewSkill() {
    if (!this.newSkillName) {
      this.toaster.show(
        'Error',
        'You need to specify a skill in order to add one',
        5,
        ToastType.Warning,
        ToastPosition.TopRight
      );
      return;
    }
    this.restService
      .addQualification(new Qualification(this.newSkillName))
      .subscribe((data) => {
        console.log(this.options);
        this.options = [...this.options, data];
        this.newSkillName = '';
      });
  }
}
