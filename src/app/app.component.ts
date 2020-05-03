import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ang-dynamic-portfolio';

  ngOnInit() {
    AOS.init({
      easing: 'ease',
      duration: 3000,
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
        $('html,body').animate({
          scrollTop: $($(this).attr('href')).offset().top - 100
        }, 500);
      });

      $('#up').on('click', function () {
        $('html,body').animate({
          scrollTop: 0
        }, 500);
      });

    })
  }
}
