import { Component, OnInit } from '@angular/core';
import { UserDetailsValidators } from '../validators/user-details-validators';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  removeToken(){
    UserDetailsValidators.removeToken()
  }
}
