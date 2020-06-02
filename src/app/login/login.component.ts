import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms'
import { PasswordMatchValidator } from '../validators/PasswordMatchValidator';
import { Router } from '@angular/router';

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
  // url = 'https://dynamic-portfolio-spring-boot.herokuapp.com/dynamicportfolio/login';
  url = 'http://localhost:8080/dynamicportfolio';
  token:string;
  invalidDetails:boolean = false;
  passMatch:boolean = false;
  userPresent:boolean = false;
  // variable declaration ends

  constructor(private http: Http, private router: Router) {
  }

  matchPassword() {
    this.passMatch = this.form.value.repass !==this.form.value.password
  }

  login() {
    let loginBody = {
      'userName': this.form.value.username,
      'password': this.form.value.password
    }

    this.http.post(this.url+'/login', loginBody).subscribe(response => {
      if(JSON.stringify(response.json()) !== '{}') {
        this.invalidDetails = false;
        this.token = response.json().jwtToken
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
    this.http.post(this.url+'/create/user', signUpBody).subscribe(response => {
      if(JSON.stringify(response.json()) !== '{}') {
        this.invalidDetails = false;
        console.log(response.json().jwtToken)
        this.token = response.json().jwtToken
        } else{
          this.invalidDetails = true;
        }
      })
  }

  validateUserName() {
    this.http.get(this.url+'/user/'+this.form.value.username)
    .subscribe(response => {
      debugger
      if(response.json().responseObject) {
        this.userPresent = true
      } else{
        this.userPresent = false
      }
    })
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
