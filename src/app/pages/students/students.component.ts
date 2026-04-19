import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../shared/interfaces/student.interface';
import { Subscription } from 'rxjs';
import { StudentTableComponent } from '../../components/student-table/student-table.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [StudentTableComponent, NgIf],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  sub!: Subscription; // store sbuscription reference to manually unsubscribe in onDestroy

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.sub = this.studentsService.getStudents().subscribe((data) => {
      // console.log(data);
      this.students = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
