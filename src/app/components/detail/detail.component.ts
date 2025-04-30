import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  student?: Student;
  router = inject(Router);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentServ.getStudent(id).subscribe({
        next: (data) => this.student = data,
        error: (err) => console.log((err))

      })
    }
  }

  deleteStudent() {
    if (this.student?.id) {
      const  confirmDelete = window.confirm('sei sicuro?');
      if (confirmDelete) {


        fetch(`https://68109e0327f2fdac2412156d.mockapi.io/students/${this.student.id}`, {
          method: 'DELETE',
        })
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            throw new Error('il messaggio di errore');
          })
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.error(error)
          })

      }
    }
  }
  getMarks(event: Event){
    event.preventDefault();
    const form = document.getElementById('form') as HTMLFormElement;
    const data = new FormData(form);
    const mark = data.get('mark') as unknown as number;
    this.student?.marks.push(mark);
    this.addMarksToStudent(this.student!.marks);
  }

  addMarksToStudent(newMarks: number[]){
    if (this.student) {
      this.studentServ.addMarks(this.student?.id, newMarks)
      .then(modifiedStudent => this.student = modifiedStudent)
    }
    
  }

}
