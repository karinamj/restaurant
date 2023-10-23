import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { CarouselComponent } from './pages/carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateMenuComponent } from './pages/create-menu/create-menu.component';
import { RouterModule, Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DetailMenuComponent } from './pages/detail-menu/detail-menu.component';
import { PlateSelectComponent } from './pages/plate-select/plate-select.component';
import { LoginComponent } from './pages/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CarouselComponent,
    CreateMenuComponent,
    DetailMenuComponent,
    PlateSelectComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module,
    SweetAlert2Module.forChild({}),
    RouterModule,
     
  ],

  exports:[
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CarouselComponent,
    CreateMenuComponent,
  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
