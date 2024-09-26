import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Adjust the path as needed
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router  // Inject Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token); // Store the token
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }
  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const { username, password } = this.loginForm.value;
  //     this.authService.login(username, password).subscribe(
  //       () => {
  //         // Navigate to the home page after successful login
  //         this.router.navigate(['/home']);
  //       },
  //       error => {
  //         // Handle login error (optional)
  //         console.error('Login failed', error);
  //       }
  //     );
  //   }
  // }
}
