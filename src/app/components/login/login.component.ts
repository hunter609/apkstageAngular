import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage!: string;
  hidePassword: boolean = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required],
      role: ['admin', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.redirectUser();
    }
  }

  onSubmit(): void {
    const pseudo = this.loginForm.get('pseudo')!.value;
    const password = this.loginForm.get('password')!.value;
    const role = this.loginForm.get('role')!.value;

    this.authService.login(pseudo, password, role).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.redirectUser(); // Redirigéna ledala
      },
      (error) => {
        this.errorMessage = error.error.error;
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Rediriger vers la page de connexion après déconnexion
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword; 
  }

  private redirectUser(): void {
    const role = this.loginForm.get('role')!.value;
    if (role === 'admin') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/enregistrer-entreprise']);
    }
  }
}
