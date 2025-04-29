import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../model/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  readonly BASE_URL = 'https://68109e0327f2fdac2412156d.mockapi.io/'
  readonly STUDENT_ENDPOINT = "students/"

  constructor(private htttp: HttpClient) {

    
   }

   getStudents(): Observable <Student[]>{
    return this.htttp.get<Student[]>(this.BASE_URL + this.STUDENT_ENDPOINT) 
  }

  getStudent(id: string): Observable<Student> {
    return this.htttp.get<Student>(this.BASE_URL + this.STUDENT_ENDPOINT + id) 
  }
}
