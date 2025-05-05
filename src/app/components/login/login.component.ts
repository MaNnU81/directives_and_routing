import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student/student.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authServ = inject(AuthService);
  
  router = inject(Router)

 
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),

  })

  fakeLogin() {
    this.authServ.isAuth = true;
    this.router.navigate(['/home']);
  }

  checkUser() {
    console.log('funziona');
  }


  submitForm() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;

      if (this.authServ.searchUser( formValues.email, formValues.password)) {
        this.authServ.isAuth = true;
        alert('Login Eseguito con Successo')
      }

      
    } else {
      // Gestione errori di validazione
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.errors) {
          console.log(key, control.errors);
        }
      });

    }
  }
}

