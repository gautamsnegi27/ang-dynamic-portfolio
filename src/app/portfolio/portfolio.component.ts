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
  private userDetailsModel = {
    description: '',
    designation: '',
    authDetailModel: Object,
    socialMediaDetailsModel: Object,
    serviceDetailModels: null,
    projectModels: null,
    experienceDetailModels: null,
  };
  owner: boolean;
  dates:string[];

  constructor(private http: Http, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let user = this.activatedRoute.snapshot.paramMap.get('user')
    this.http.get(this.url + '/user/' + user).subscribe(response => {
      if (JSON.stringify(response.json()) !== '{}') {
        this.userDetailsModel.designation = response.json().responseObject.designation;
        this.userDetailsModel.description = response.json().responseObject.description;
        this.userDetailsModel.authDetailModel = response.json().responseObject.authDetailModel;
        this.userDetailsModel.serviceDetailModels = response.json().responseObject.serviceDetailModels;
        this.userDetailsModel.projectModels = response.json().responseObject.projectModels;
        this.userDetailsModel.socialMediaDetailsModel = response.json().responseObject.socialMediaDetailsModel;
        this.userDetailsModel.experienceDetailModels = response.json().responseObject.experienceDetailModels;
        this.userDetailsModel.experienceDetailModels.forEach(element => {
          this.dates = [];
          let date = element.from+"-"+element.to;
          this.dates.push(date);
          console.log(this.dates);
        });


      } else {
        console.log(response)
      }
    });

    this.owner = localStorage.getItem("token") ? true : false;

    AOS.init({
      easing: 'ease',
      duration: 500,
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

  scroll(event: string) {
    console.log(event);
    document.getElementById(event).scrollIntoView({
      behavior: "smooth"
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }

  delay(i){
    return 100*i
  }
}
