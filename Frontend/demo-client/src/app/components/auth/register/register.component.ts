import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../model/register-request';
import {User} from '../model/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
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

    const request: RegisterRequest = {
      username: this.user.username,
      password: this.user.password
    };

    this.authService.register(request).subscribe({
      next: () => {
        this.router.navigate(['/todos']);
      },
      error: () => {
        this.errorMessage = 'Registration failed'; // todo: different error messages for different scenarios
      }
    });
  }
}
