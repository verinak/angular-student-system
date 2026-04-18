import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent {
  @Input() id!: string; // read id path param
  // don't forget: withComponentInputBinding in app.config
}
