import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../shared/interfaces/student.interface';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  Subscription,
} from 'rxjs';
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
  // students$ = this.studentsService.getStudents(); // store observable instead of data
  // filteredStudents$ = this.students$.pipe(
  //   map((data) =>
  //     data.filter((student) =>
  //       `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`.includes(
  //         this.searchQuery.toLowerCase(),
  //       ),
  //     ),
  //   ),
  // );

  // https://medium.com/@bananicabananica/search-filter-with-rxjs-81d38863ecb2
  searchQuery$ = new BehaviorSubject<string>('');

  students$ = combineLatest([
    this.studentsService.getStudents(),
    this.searchQuery$,
  ]).pipe(
    map(([data, query]) => {
      if (!query) return data;
      return data.filter((student) =>
        `${student.firstName} ${student.lastName}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      );
    }),
  );

  constructor(private studentsService: StudentsService) {}

  onDeleteReceived(id: number) {
    // console.log('delete received', id);
    this.studentsService.deleteStudent(id);
  }

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery$.next(input.value);
  }
}
