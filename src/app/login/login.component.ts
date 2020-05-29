import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // variable declaration starts
  form = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl(),
      'firstname': new FormControl(),
      'lastname': new FormControl(),
    });
  // url = 'https://dynamic-portfolio-spring-boot.herokuapp.com/dynamicportfolio/login';
  url = 'http://localhost:8080/dynamicportfolio/login';
  token:string;
  invalidDetails:boolean = false;
  // variable declaration ends

  constructor(private http: Http) {
  }

  login() {
    let post = {
      'userName': this.form.value.username,
      'password': this.form.value.password
    }

    this.http.post(this.url, post).subscribe(response => {
      if(JSON.stringify(response.json()) !== '{}') {
        this.invalidDetails = false;
        console.log(response.json().jwtToken)
        this.token = response.json().jwtToken
        } else{
          this.invalidDetails = true;
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
