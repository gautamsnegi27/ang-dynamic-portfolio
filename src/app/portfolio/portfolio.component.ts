import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as $ from 'jquery';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  title = 'ang-dynamic-portfolio';

  constructor(){}
  
  ngOnInit() {
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

}
