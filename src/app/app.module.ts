import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { MovieApiServiceService } from './services/movie-api-service.service';

import { ReactiveFormsModule } from '@angular/forms';
import { TransUrlInterceptor } from './interceptors/trans-url.interceptor';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    MovieApiServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: TransUrlInterceptor, multi:true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
