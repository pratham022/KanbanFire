import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['dashboard'])
    }
  }

  onSubmit() {
    if(this.signUpForm.valid) {
      let email = this.signUpForm.value['email'];
      let password = this.signUpForm.value['password'];
      this.authService.SignUp(email, password);
    }
  }

}
