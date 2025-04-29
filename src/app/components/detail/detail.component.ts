import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
    route = inject(ActivatedRoute);
    studentServ = inject(StudentService)
    student?:Student;

    constructor(){
     const id = this.route.snapshot.paramMap.get('id');
     if (id) {
      this.studentServ.getStudent(id).subscribe({
        next:(data) => this.student = data,
        error: (err) => console.log((err))
        
      })
     }
      
      
    }
}
