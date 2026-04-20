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

  constructor() {
    // get saved data from localstorage
    const savedData = localStorage.getItem('students');
    // console.log(savedData ? JSON.parse(savedData) : []);
    this.studentsSubject.next(savedData ? JSON.parse(savedData) : []);
  }

  getStudents() {
    return this.students$;
  }

  addStudent(student: Student) {
    const currentData = this.studentsSubject.value;
    // generate auto increment id
    const lastId = Math.max(...currentData.map((student) => student.id));
    const newStudent = {
      ...student,
      id: currentData.length ? lastId + 1 : 1, // 34an Math.max btraga3 infinity lw empty array
    };

    this.studentsSubject.next([...currentData, newStudent]);

    // update localstorage
    localStorage.setItem(
      'students',
      JSON.stringify(this.studentsSubject.value),
    );
  }

  deleteStudent(id: number) {
    const currentData = this.studentsSubject.value;
    this.studentsSubject.next(
      currentData.filter((student) => student.id !== id),
    );

    // update localstorage
    localStorage.setItem(
      'students',
      JSON.stringify(this.studentsSubject.value),
    );
  }
}
