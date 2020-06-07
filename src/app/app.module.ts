import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FillDetailsComponent } from './fill-details/fill-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortfolioComponent,
    NotFoundComponent,
    FillDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'portfolio/user/:user',
        component: PortfolioComponent
      },
      {
        path: 'fill/details/:user',
        component: FillDetailsComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
