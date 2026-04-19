import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../shared/interfaces/student.interface';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { StudentCardComponent } from '../../components/student-card/student-card.component';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [NgIf, StudentCardComponent],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent implements OnInit, OnDestroy {
  @Input() id!: string; // read id path param
  // don't forget: withComponentInputBinding in app.config
  student: Student | undefined;
  sub!: Subscription; // store sbuscription reference to manually unsubscribe in onDestroy

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.sub = this.studentsService.getStudents().subscribe((data) => {
      // console.log(data);
      this.student = data.find((student) => student.id === Number(this.id));
      // akid fi tari2a a7san mn keda bs ba3den ba2a
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
