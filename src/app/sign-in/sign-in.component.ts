import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  newStatus: string;

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  constructor(public authService: AuthService, private router: Router) { 
    this.newStatus = "Login";
  }

  ngOnInit(): void {
    this.authService.getSubjectVal().subscribe(newStatus=>{     // subscribe to the function in step 3
      this.newStatus = newStatus;
      this.router.navigate(['/home'])
      if(this.authService.isLoggedIn) {
        this.router.navigate(['/home'])
        console.log("navigating in signin internal ")
      } else {
        console.log("Some issue")
      }
    })
    if(this.authService.isLoggedIn) {
      this.router.navigate(['/home'])
      console.log("navigating in signin")
    }
  }

  onSubmit() {
    if(this.signInForm.valid) {
      let email = this.signInForm.value['email'];
      let password = this.signInForm.value['password'];
      this.authService.SignIn(email, password);
    }
  }

}
