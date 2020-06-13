import { Component, OnInit } from '@angular/core';
import { UserDetailsValidators } from '../validators/user-details-validators';

@Component({
  selector: 'app-insufficient-details',
  templateUrl: './insufficient-details.component.html',
  styleUrls: ['../not-found/not-found.component.css']
})
export class InsufficientDetailsComponent implements OnInit {
  constructor() { }
  mailbody="Please fill the below details:%0D%0A%0D%0Adescription:%0D%0A%0D%0Adesignation:%0D%0A%0D%0ASocialMediaDetails%0D%0AfbUrl:%0D%0AinstaUrl:%0D%0AlinkedinUrl:%0D%0A%0D%0Aservices%0D%0A1.%0D%0AserviceName:%0D%0AserviceDescription:%0D%0A2.%0D%0AserviceName:%0D%0AserviceDescription:%0D%0A3.%0D%0A.%0D%0A.%0D%0A.%0D%0A%0D%0A%0D%0AProjectModel%0D%0A1.%0D%0AprojectName:%0D%0AprojectDescription:%0D%0AprojectImage:%0D%0AprojectLink:%0D%0A2. %0D%0AprojectName:%0D%0AprojectDescription:%0D%0AprojectImage:%0D%0AprojectLink:%0D%0A3. %0D%0A.%0D%0A.%0D%0A.%0D%0A%0D%0AExperienceDetailModel%0D%0A%0D%0A1. %0D%0A	from:%0D%0A	to:%0D%0A	companyName:%0D%0A	jobDescription:%0D%0A2. %0D%0A	from:%0D%0A	to:%0D%0A	companyName:%0D%0A	jobDescription:%0D%0A3. %0D%0A.%0D%0A.%0D%0A.%0D%0A"
  ngOnInit() {
  }

  removeToken() {
    UserDetailsValidators.removeToken()
  }
}
