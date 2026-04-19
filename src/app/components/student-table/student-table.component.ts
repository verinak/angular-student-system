import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../shared/interfaces/student.interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, RouterLink],
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.css',
})
export class StudentTableComponent {
  @Input() students!: Student[];
  @Output() deleteEmitter = new EventEmitter<number>();

  handleDelete(id: number) {
    this.deleteEmitter.emit(id);
  }
}
