import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Student } from '../../model/student';
import { Observable, takeLast } from 'rxjs';


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

  // addMarks(id: string, marks: number[]): Promise<Student>{

  //   const patchValue = {marks: marks}

  //   return fetch(this.BASE_URL + this.STUDENT_ENDPOINT + id, {
  //     method: 'PUT',
  //     headers: {'content-type':'application/json'},
  //     body: JSON.stringify(patchValue)
  //   }).then(res => {

  //         return res.json();
      
  //     // handle error
  //   }).catch(error => {
  //     // handle error
  //   })
  // }

  addMarks1(marksArray: number[], student: Student): Observable<Student> {
    const url = this.BASE_URL + this.STUDENT_ENDPOINT + student.id;
    const body = { marks: marksArray };

    return this.http.put<Student>(url, body, {
      headers: { 'Content-Type': 'application/json' }
    });
}

addStudent() {
  const testStudent: Student = {
    name: 'Zena',
    surname: 'Genova',
    country:  'Italy',
    gender: 'Intersex woman',
    dob: '1961-05-08T00:36:17.682Z',
    imageUrl: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/36.jpg",
    marks: []
}
const url = this.BASE_URL + this.STUDENT_ENDPOINT;

fetch(url, {
  method: 'POST',
  headers: {'content-type':'application/json'},
  
  body: JSON.stringify(testStudent)
}).then(res => {
  
      return res.json();
  
  
}).then(task => {
  console.log(task);
  
}).catch(error => {
 console.log(error);
 
})
 
}

}
