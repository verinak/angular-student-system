import { Component, Input } from '@angular/core';
import { Student } from '../../shared/interfaces/student.interface';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css',
})
export class StudentCardComponent {
  @Input() student!: Student;
}
