import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieApiServiceService } from 'src/app/services/movie-api-service.service';
import { Movie } from 'src/app/services/movie-api-service.service'

interface MoviePoster {
  id:number,
  poster_path: string,
}

interface Banner {
  backdrop_path: string, 
  original_title:string | null;
  overview: string | null;
}

function mapToMoviePosters(movies: Movie[]): MoviePoster[] {
  return movies.map((movie) => {
    const { id, poster_path } = movie;
    return { id, poster_path } as MoviePoster;
  });
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnDestroy {
  constructor( private service: MovieApiServiceService ) {}

  //Subscriptions
  private bannerSub : Subscription = new Subscription();
  private trendingMovieSub : Subscription = new Subscription();
  private actionMovieSub : Subscription = new Subscription();
  private adventureMovieSub : Subscription = new Subscription();
  private animationMovieSub : Subscription = new Subscription();
  private comedyMovieSub : Subscription = new Subscription();
  private documentaryMovieSub : Subscription = new Subscription();
  private scienceFictionMovieSub : Subscription = new Subscription();
  private thrillerMovieSub : Subscription = new Subscription();
  
  //Results
  bannerResult: Banner[] = [];
  trendingMovieResult: MoviePoster[] = [];
  actionMoviesResult: MoviePoster[] = [];
  adventureMoviesResult: MoviePoster[] = [];
  animationMoviesResult: MoviePoster[] = [];
  comedyMoviesResult: MoviePoster[] = [];
  documentaryMoviesResult: MoviePoster[] = [];
  scienceFictionMoviesResult: MoviePoster[] = [];
  thrillerMoviesResult: MoviePoster[] = [];


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

  ngOnDestroy(): void {
    this.bannerSub.unsubscribe();
    this.trendingMovieSub.unsubscribe();
    this.actionMovieSub.unsubscribe();
    this.adventureMovieSub.unsubscribe();
    this.animationMovieSub.unsubscribe();
    this.comedyMovieSub.unsubscribe();
    this.documentaryMovieSub.unsubscribe();
    this.scienceFictionMovieSub.unsubscribe();
    this.thrillerMovieSub.unsubscribe();
  }

  
  //banner data
  bannerData(){
    this.bannerSub = this.service.bannerApiData().subscribe( (result) => {
      console.log(result, 'bannerresult#');
      console.log(typeof result, 'bannerresult#');
      this.bannerResult = result.map((movie) => {
        const {  backdrop_path, original_title, overview } = movie;
        return { backdrop_path, original_title, overview } as Banner;
      });;
    })
  }

  tredingData(){
    this.trendingMovieSub = this.service
      .trendingMovieApiData()
      .subscribe((result) => {
        this.trendingMovieResult = mapToMoviePosters(result);
      }
    )
  }

  actionMovie(){
    this.actionMovieSub = this.service
      .fetchActionMovies()
      .subscribe( (result) => {
        this.actionMoviesResult = mapToMoviePosters(result)
      }
    )
  }

  adventureMovie(){
    this.adventureMovieSub = this.service
      .fetchAdventureMovies()
      .subscribe( (result) => {
        this.adventureMoviesResult = mapToMoviePosters(result);
      }
    )
  }

  animationMovie(){
    this.animationMovieSub = this.service
      .fetchAnimationMovies()
      .subscribe( (result) => {
        this.animationMoviesResult = mapToMoviePosters(result);
      }
    )
  }

  comedyMovie(){
    this.comedyMovieSub = this.service
      .fetchComedyMovies()
      .subscribe( (result) => {
        this.comedyMoviesResult = mapToMoviePosters(result);
      }
    )
  }

  documentaryMovie(){
    this.documentaryMovieSub = this.service
      .fetchDocumentaryMovies()
      .subscribe( (result) => {
        this.documentaryMoviesResult = mapToMoviePosters(result);
      }
    )
  }

  scienceFictionMovie(){
    this.scienceFictionMovieSub = this.service
      .fetchScienceFictionMovies()
      .subscribe( (result) => {
        this.scienceFictionMoviesResult = mapToMoviePosters(result);
      }
    )
  }

  thrillerMovie(){
    this.thrillerMovieSub = this.service
      .fetchThrillerMovies()
      .subscribe( (result) => {
        this.thrillerMoviesResult = mapToMoviePosters(result);
      }
    )
  }

}
