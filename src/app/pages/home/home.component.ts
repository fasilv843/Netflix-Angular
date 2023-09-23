import { Component } from '@angular/core';
import { MovieApiServiceService } from 'src/app/services/movie-api-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor( private service: MovieApiServiceService ) {}
  
  bannerResult: any = [];
  trendingMovieResult: any = []

  ngOnInit(): void {
    this.bannerData();
    this.tredingData( )
  }

  //banner data
  bannerData(){
    this.service.bannerApiData().subscribe( (result) => {
      console.log(result, 'bannerresult#');
      this.bannerResult = result.results;
    })
  }

  tredingData(){
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'trendingresult#');
      this.trendingMovieResult = result.results;
    })
  }
}
