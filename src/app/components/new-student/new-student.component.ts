import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-new-student',
  imports: [],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss'
})
export class NewStudentComponent {


  studentServ = inject(StudentService)
}
