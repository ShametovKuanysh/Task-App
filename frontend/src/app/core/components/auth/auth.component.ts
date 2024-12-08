import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;
  mode: 'login' | 'register' = 'login';

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute, 
              private authService: AuthService, 
              private router: Router,
              // private notificationService: NotificationService
            ) {
    this.route.params.subscribe(params => {
      this.mode = params['mode'];
      this.isLoginMode = this.mode == 'login';
    });
    this.authForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required],
      email: ['', [Validators.email]],
    });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { username, email, password } = this.authForm.value;
    if (this.isLoginMode) {
      this.authService.login({username, password}).subscribe({
        next: () => {
          this.authForm.reset()
          this.router.navigate(['/notes'])
          // this.notificationService.addNotification('Login successful', 'info')
        },
        error: (error) => {
          console.error('Error logging in:', error)
          // this.notificationService.addNotification('Login error: ' + error, 'error')
        }
      });
    } else {
      this.authService.register({username, email, password}).subscribe({
        next: () => {
          this.authForm.reset()
          this.switchMode();
        },
        error: (error) => {
          console.error('Error registering:', error)
          // this.notificationService.addNotification('Register error', 'error')
        }
      })
    }
  }
}
