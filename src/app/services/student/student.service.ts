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

addStudent(studentData: Omit<Student, 'id' | 'marks'>): Promise<Student> {
  const studentToSend: Student = {
    ...studentData,
    marks: [] // Inizializza sempre l'array marks vuoto come nell'interfaccia
  };

  const url = this.BASE_URL + this.STUDENT_ENDPOINT;

  return fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(studentToSend)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json() as Promise<Student>;
  });
}


}
