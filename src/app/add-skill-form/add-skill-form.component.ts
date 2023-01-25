import { Component, EventEmitter, Output } from '@angular/core';
import { ToastPosition, ToastType } from '../model/Toast';
import { Qualification } from '../model/Qualification';
import { EmployeeApiService } from '../service/employee-api.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-add-skill-form',
  templateUrl: './add-skill-form.component.html',
  styleUrls: ['./add-skill-form.component.css'],
})
export class AddSkillFormComponent {
  @Output()
  skillAdded = new EventEmitter<Qualification>();

  newName = '';

  constructor(
    private restService: EmployeeApiService,
    private toaster: ToastService
  ) {}
  addNewSkill() {
    if (!this.newName) {
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
      .addQualification(new Qualification(this.newName))
      .subscribe((q) => {
        this.skillAdded.emit(q);
        this.newName = '';
      });
  }
}
