import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ResponseObject } from 'src/models/ResponseObject';
import { UserDetailsService } from '../service/user-details.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  title = 'ang-dynamic-portfolio';
  userDetailsModel;
  responseModel: ResponseObject;
  owner: boolean;
  dates: string[];

  constructor(private http: HttpClient, private router: Router,
    private activatedRoute: ActivatedRoute, private userDetailsService: UserDetailsService) { }

  ngOnInit() {
    let user = this.activatedRoute.snapshot.paramMap.get('user')
    this.userDetailsService.getUser(user)
      .subscribe(response => {
        if (response.status.code != 104
            && response.responseObject != undefined
            && response.responseObject.socialMediaDetailsModel != undefined) {
          this.userDetailsModel = response.responseObject
          this.userDetailsModel.experienceDetailModels.forEach(element => {
            this.dates = [];
            let date = element.from + "-" + element.to;
            this.dates.push(date);
          });
        } else {
          this.router.navigate(['pagenotfound'])
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
    document.getElementById(event).scrollIntoView({
      behavior: "smooth"
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}
