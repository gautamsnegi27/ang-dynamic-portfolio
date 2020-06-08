import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { UserDetailsModel } from 'src/models/UserDetailsModel';
import { AuthModel } from 'src/models/AuthModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variable declaration starts
  form = new FormGroup({
      'username': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl(),
      'repass': new FormControl(),
      'firstname': new FormControl(),
      'lastname': new FormControl(),
    });
  url = 'https://dynamic-portfolio-spring-boot.herokuapp.com/dynamicportfolio';
  // url = 'http://localhost:8080/dynamicportfolio';
  invalidDetails:boolean = false;
  passMatch:boolean = false;
  userPresent:boolean = false;
  passPattern:boolean;
  accountCreated:boolean = false;
  // variable declaration ends

  constructor(private http: HttpClient, private router: Router) {
  }

  matchPassword() {
    this.passMatch = this.form.value.repass !==this.form.value.password
  }

  login() {
    let loginBody = {
      'userName': this.form.value.username,
      'password': this.form.value.password
    }

    this.http.post<AuthModel>(this.url+'/login', loginBody).subscribe(response => {
      debugger
      if(JSON.stringify(response) !== '{}') {
        this.invalidDetails = false;
        localStorage.setItem("token", response.jwtToken)
        this.router.navigate(['/portfolio/user', this.form.value.username])
        } else{
          this.invalidDetails = true;
        }
      })
  }

  signUp() {
    let signUpBody = {
      'authDetailModel': {
      'userName': this.form.value.username,
      'email': this.form.value.email,
      'password': this.form.value.password,
      'firstname': this.form.value.firstname,
      'lastname': this.form.value.lastname
    },
    'roles':["USER"]
  }
    this.http.post<AuthModel>(this.url+'/create/user', signUpBody).subscribe(response => {
      if(JSON.stringify(response) !== '{}') {
        this.accountCreated = true;
        this.router.navigate(['/']);
        } else{
          this.invalidDetails = true;
          this.accountCreated = false;
        }
      })
  }

  validateUserName() {
    this.http.get<UserDetailsModel>(this.url+'/user/'+this.form.value.username)
    .subscribe(response => {
      debugger
      if(response.responseObject) {
        this.userPresent = true
      } else{
        this.userPresent = false
      }
    })
  }

  passwordPattern(){
    let regEx = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}");
    this.passPattern = !regEx.test(this.form.value.password);
  }
  ngOnInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }
}
