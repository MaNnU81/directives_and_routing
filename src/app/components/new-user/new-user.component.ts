import { Component, inject } from '@angular/core';
import {   RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {

authServ = inject(AuthService);

  NewUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),

  });
  router: any;



  submitForm() {
    if (this.NewUserForm.valid) {
      const { email, password } = this.NewUserForm.value;
      
      this.authServ.addUser({ email: email!, password: password! })
        .subscribe({
          next: () => {
            alert('Registrazione completata!');
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Errore:', err);
            alert('Errore durante la registrazione');
          }
        });
    }
  }
}




