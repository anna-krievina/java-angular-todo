import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../model/login-request';
import {User} from '../model/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user: User
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = new User();
  }

  onSubmit(): void {
    this.errorMessage = '';

    const request: LoginRequest = {
      username: this.user.username,
      password: this.user.password
    };

    this.authService.login(request).subscribe({
      next: () => {
        this.router.navigate(['/todos']);
      },
      error: () => {
        this.errorMessage = 'Incorrect username or password';
      }
    });
  }
}
