import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import {   FormControl, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Student } from '../../model/student';

interface Country {
  name: {
    common: string;
  };
  cca2: string;
}

@Component({
  selector: 'app-new-student',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss'
})
export class NewStudentComponent implements OnInit {
  private http = inject(HttpClient);
  studentServ = inject(StudentService)

  countries: Country[] = [];
  isLoading = true;
  error: string | null = null;


  myForm = new FormGroup({
    name: new FormControl('',  [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('',  [Validators.required, Validators.minLength(3)]),
    dob: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.fetchCountries();
  }

  fetchCountries() {
    this.http.get<Country[]>('https://restcountries.com/v3.1/all?fields=name,cca2')
      .subscribe({
        next: (data) => {
          this.countries = data.sort((a, b) => 
            a.name.common.localeCompare(b.name.common)
          );
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Errore nel caricamento delle nazioni';
          this.isLoading = false;
          console.error(err);
        }
      });
  }


  submitForm() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      
      // Trova il nome completo della nazione dal codice
      const selectedCountry = this.countries.find(c => c.cca2 === formData.country);
      const countryName = selectedCountry?.name.common || formData.country || '';
  
      // Prepara solo i dati effettivamente presenti nel form
      const studentData: Omit<Student, 'id' | 'marks'> = {
        name: formData.name!,
        surname: formData.surname!,
        country: countryName,
        dob: formData.dob!
      };
  
      this.studentServ.addStudent(studentData)
        .then(response => {
          console.log('Studente creato:', response);
          this.myForm.reset();
        })
        .catch(error => {
          console.error('Errore nel salvataggio:', error);
        });
    } else {
      // Gestione errori di validazione
      Object.keys(this.myForm.controls).forEach(key => {
        const control = this.myForm.get(key);
        if (control?.errors) {
          console.log(key, control.errors);
        }
      });
    }

  }
}


