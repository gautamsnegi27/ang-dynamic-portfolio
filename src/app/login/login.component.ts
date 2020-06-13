import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailsService } from '../service/user-details.service';
import { UserDetailsValidators } from '../validators/user-details-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variable declaration starts
  form = new FormGroup({
    'username': new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      UserDetailsValidators.cannotContainSpace
    ]),
    'email': new FormControl('', [
      Validators.required,
      Validators.email]),
    'password': new FormControl('', [
      Validators.required,
      UserDetailsValidators.passwordValidation,
    ]),
    'repass': new FormControl('', Validators.required),
    'firstname': new FormControl('', Validators.required),
    'lastname': new FormControl('', Validators.required),
  }, UserDetailsValidators.passwordShouldMatch,
    );

  signInForm = new FormGroup({
    'sUsername': new FormControl('',
      Validators.required),
    'sPassword': new FormControl('',
      Validators.required)
  });

  invalidDetails: boolean = false;
  passMatch: boolean = false;
  userPresent: boolean = false;
  emailPresent: boolean = false;
  passPattern: boolean;
  accountCreated: boolean;
  // variable declaration ends

  constructor(private router: Router,
    private userDetailsService: UserDetailsService) {
  }

  // getters start here
  public get username() {
    return this.form.get('username')
  }

  public get email() {
    return this.form.get('email')
  }

  public get password() {
    return this.form.get('password')
  }

  public get repass() {
    return this.form.get('repass')
  }

  public get firstname() {
    return this.form.get('firstname')
  }

  public get lastname() {
    return this.form.get('lastname')
  }

  public get sUsername() {
    return this.signInForm.get('sUsername')
  }

  public get sPassword() {
    return this.signInForm.get('sPassword')
  }

  // end start here



  login() {
    let loginBody = {
      userName: this.signInForm.value.sUsername,
      password: this.signInForm.value.sPassword
    }

    this.userDetailsService.loginUser(loginBody)
      .subscribe(response => {
        if (response.jwtToken) {
          this.invalidDetails = false;
          localStorage.setItem("token", response.jwtToken)
          this.router.navigate(['/portfolio/user', response.userName])
        } else {
          this.invalidDetails = true;
        }
      })
  }

  signUp() {
    let signUpBody = {
      authDetailModel: {
        userName: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname
      },
      roles: ['ADMIN']
    }

    this.userDetailsService.createUser(signUpBody)
      .subscribe(response => {
        if (response.status.code === 1000) {
          this.accountCreated = true;
          this.router.navigate(['/']);
        } else {
          this.accountCreated = false;
        }
      })
  }

  validateEmail() {
    if (this.form.value.email.trim()) {
      this.userDetailsService.validateField('email', this.form.value.email)
        .subscribe(response => {
          if (response.status.code == 105) {
            this.emailPresent = true
          } else {
            this.emailPresent = false
          }
        });
    }
  }

  validateUser() {
    if (this.form.value.username.trim()) {
      this.userDetailsService.validateField('user', this.form.value.username)
        .subscribe(response => {
          if (response.status.code == 105) {
            this.userPresent = true
          } else {
            this.userPresent = false
          }
        });
    }
  }

  ngOnInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const createSignUp = document.getElementById('createSignUp');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    createSignUp.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }
}
