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
  actionMoviesResult:any = []
  adventureMoviesResult:any = []
  animationMoviesResult:any = []
  comedyMoviesResult:any = []
  documentaryMoviesResult:any = []
  scienceFictionMoviesResult:any = []
  thrillerMoviesResult:any = []


  ngOnInit(): void {
    this.bannerData();
    this.tredingData()
    this.actionMovie()
    this.adventureMovie()
    this.animationMovie()
    this.comedyMovie()
    this.documentaryMovie()
    this.scienceFictionMovie()
    this.thrillerMovie()
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

  actionMovie(){
    this.service
      .fetchActionMovies()
      .subscribe( (result) => {
        this.actionMoviesResult = result.results
      }
    )
  }

  adventureMovie(){
    this.service
      .fetchAdventureMovies()
      .subscribe( (result) => {
        this.adventureMoviesResult = result.results
      }
    )
  }

  animationMovie(){
    this.service
      .fetchAnimationMovies()
      .subscribe( (result) => {
        this.animationMoviesResult = result.results
      }
    )
  }

  comedyMovie(){
    this.service
      .fetchComedyMovies()
      .subscribe( (result) => {
        this.comedyMoviesResult = result.results
      }
    )
  }

  documentaryMovie(){
    this.service
      .fetchDocumentaryMovies()
      .subscribe( (result) => {
        this.documentaryMoviesResult = result.results
      }
    )
  }

  scienceFictionMovie(){
    this.service
      .fetchScienceFictionMovies()
      .subscribe( (result) => {
        this.scienceFictionMoviesResult = result.results
      }
    )
  }

  thrillerMovie(){
    this.service
      .fetchThrillerMovies()
      .subscribe( (result) => {
        this.thrillerMoviesResult = result.results
      }
    )
  }





}
