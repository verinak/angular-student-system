import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../shared/interfaces/student.interface';
import { Subscription } from 'rxjs';
import { StudentTableComponent } from '../../components/student-table/student-table.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [StudentTableComponent, NgIf, AsyncPipe],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  students$ = this.studentsService.getStudents(); // store observable instead of data
  constructor(private studentsService: StudentsService) {}

  onDeleteReceived(id: number) {
    // console.log('delete received', id);
    this.studentsService.deleteStudent(id);
  }
}
