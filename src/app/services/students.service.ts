import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../shared/interfaces/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  // create behavior subject with empty list of Students
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable(); // create students observable

  constructor() {}

  getStudents() {
    return this.students$;
  }

  addStudent(student: Student) {
    const currentData = this.studentsSubject.value;
    // generate auto increment id
    const lastId = Math.max(...currentData.map((student) => student.id));
    const newStudent = {
      ...student,
      id: lastId ? lastId + 1 : 1,
    };

    this.studentsSubject.next([...currentData, newStudent]);
  }

  deleteStudent(id: number) {
    const currentData = this.studentsSubject.value;
    this.studentsSubject.next(
      currentData.filter((student) => student.id !== id),
    );
  }
}
