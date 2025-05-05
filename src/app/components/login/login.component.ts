import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authServ = inject(AuthService);
  
  router = inject(Router);
  isLoading = false; 
 
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),

  });
  

  fakeLogin() {
    this.authServ.isAuth = true;
    this.router.navigate(['/home']);
  };

  checkUser() {
    if (this.loginForm.invalid || this.isLoading) return;

    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    
    this.authServ.checkCredentials(email!, password!).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/home']);
        } else {
          alert('Credenziali non valide!'); // Mostra sempre lo stesso messaggio
        }
      },
      error: (err) => {
        // Gestisce sia 404 che altri errori
        alert('Credenziali non valide!');
        console.error('Errore API:', err);
      },
      complete: () => this.isLoading = false
    });
  }
}

