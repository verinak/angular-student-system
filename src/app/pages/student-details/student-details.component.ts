import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../shared/interfaces/student.interface';
import { map, Subscription, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { StudentCardComponent } from '../../components/student-card/student-card.component';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [NgIf, StudentCardComponent, AsyncPipe],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent {
  @Input() id!: string; // read id path param
  // don't forget: withComponentInputBinding in app.config

  student$ = this.studentsService
    .getStudents()
    .pipe(
      map((data) => data.find((student) => student.id === Number(this.id))),
    );

  constructor(private studentsService: StudentsService) {
    console.log(this.student$);
  }
}
