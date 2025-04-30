import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Student } from '../../model/student';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  readonly BASE_URL = 'https://68109e0327f2fdac2412156d.mockapi.io/'
  readonly STUDENT_ENDPOINT = "students/"
  

  constructor(private http: HttpClient) {

    
   }

   getStudents(): Observable <Student[]>{
    return this.http.get<Student[]>(this.BASE_URL + this.STUDENT_ENDPOINT) 
  }

  getStudent(id: string): Observable<Student> {
    return this.http.get<Student>(this.BASE_URL + this.STUDENT_ENDPOINT + id) 
  }

  addMarks(id: string, marks: number[]): Promise<Student>{

    const patchValue = {marks: marks}

    return fetch(this.BASE_URL + this.STUDENT_ENDPOINT + id, {
      method: 'PUT',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(patchValue)
    }).then(res => {

          return res.json();
      
      // handle error
    }).catch(error => {
      // handle error
    })
  }

 
}
