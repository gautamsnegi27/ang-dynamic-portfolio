import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  title = 'ang-dynamic-portfolio';
// url = 'https://dynamic-portfolio-spring-boot.herokuapp.com/dynamicportfolio/login';
  url = 'http://localhost:8080/dynamicportfolio';
  description:string;
  designation:string;
  authDetailModel:{};
  socialMediaDetailsModel:{};
  services:[];
  projectModels:[];
  experienceDetailModels:[];
  
  constructor(private http: Http, private router: Router,
    private activatedRoute: ActivatedRoute){}
  
  ngOnInit() {
    let user = this.activatedRoute.snapshot.paramMap.get('user')
    this.http.get(this.url+'/user/'+ user).subscribe(response => {
      if(JSON.stringify(response.json()) !== '{}') {
        this.designation = response.json().responseObject.designation
        this.description = response.json().responseObject.description
        this.authDetailModel = response.json().responseObject.authDetailModel
        this.services = response.json().responseObject.serviceDetailModels

        } else{
          console.log(response)
        }
      });

    AOS.init({
      easing: 'ease',
      duration: 2000,
      once: true
    });

    $(document).ready(function () {
      $('.menu-toggler').on('click', function () {
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
      });

      $('.top-nav .nav-link').on('click', function () {
        $('.menu-toggler').removeClass('open');
        $('.top-nav').removeClass('open');
      });

      $('nav a[href*="#"]').on('click', function () {
        $('html,.container').animate({
          scrollTop: $($(this).attr('href')).offset().top - 100
        }, 500);
      });

      $('#up').on('click', function () {
        $('html,.container').animate({
          scrollTop: 0
        }, 500);
      });
    })

    


  }

  scroll(event:string) {
    console.log(event);
    document.getElementById(event).scrollIntoView({
      behavior: "smooth"});
  }

  logout(){
    this.router.navigate(['/'])
  }

}
