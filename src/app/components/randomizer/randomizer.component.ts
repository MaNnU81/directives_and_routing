import { Component, inject } from '@angular/core';
import { Student } from '../../model/student';
import { StudentService } from '../../services/student/student.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-randomizer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent {
  students: Student[] = [];
  groups: Student[][] = [];
  groupSize: number = 2;
  studentServ = inject(StudentService);

  constructor() {
    this.studentServ.getStudents().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.log(err)
    });
  }

  randomizeGroups() {
    this.groups = [];
    const shuffled = [...this.students].sort(() => 0.5 - Math.random());
    
    while (shuffled.length) {
      this.groups.push(shuffled.splice(0, this.groupSize));
    }
  }
}