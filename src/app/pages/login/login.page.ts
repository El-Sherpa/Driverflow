import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, UserRole } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      // Simulación de lógica de roles basada en el username para la demo
      let role: UserRole = 'cliente';
      if (username.toLowerCase().includes('admin')) role = 'admin';
      else if (username.toLowerCase().includes('empresa')) role = 'empresa';

      this.authService.login(username, role);
      
      switch (role) {
        case 'admin': this.router.navigate(['/admin-dashboard']); break;
        case 'empresa': this.router.navigate(['/empresa-dashboard']); break;
        case 'cliente': this.router.navigate(['/cliente-dashboard']); break;
      }
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
