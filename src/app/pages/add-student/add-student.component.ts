import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css',
})
export class AddStudentComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
  ) {
    // todo : validation w n show errors w keda badal el disabled button da
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      level: [
        null,
        [Validators.required, Validators.min(1), Validators.max(4)],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      department: ['', Validators.required],
      GPA: [null, [Validators.required, Validators.min(0), Validators.max(4)]],
      enrollmentDate: ['', Validators.required],
      isActive: [false],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      // console.log(this.studentForm.value);
      // console.log(this.studentForm.value.enrollmentDate);
      const student = {
        ...this.studentForm.value,
        enrollmentDate: new Date(this.studentForm.value.enrollmentDate),
      };
      console.log(student);
      this.studentService.addStudent(student);
    }
  }
}
