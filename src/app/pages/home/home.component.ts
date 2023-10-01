import { Component } from '@angular/core';
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



export class HomeComponent {
  constructor( private service: MovieApiServiceService ) {}
  
  bannerResult: Banner[] = [];
  trendingMovieResult: MoviePoster[] = []
  actionMoviesResult: MoviePoster[] = []
  adventureMoviesResult: MoviePoster[] = []
  animationMoviesResult: MoviePoster[] = []
  comedyMoviesResult: MoviePoster[] = []
  documentaryMoviesResult: MoviePoster[] = []
  scienceFictionMoviesResult: MoviePoster[] = []
  thrillerMoviesResult: MoviePoster[] = []


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
      console.log(typeof result, 'bannerresult#');
      this.bannerResult = result.map((movie) => {
        const {  backdrop_path, original_title, overview } = movie;
        return { backdrop_path, original_title, overview } as Banner;
      });;
    })
  }

  tredingData(){
    this.service
      .trendingMovieApiData()
      .subscribe((result) => {
        this.trendingMovieResult = mapToMoviePosters(result);
      }
    )
  }

  actionMovie(){
    this.service
      .fetchActionMovies()
      .subscribe( (result) => {
        this.actionMoviesResult = mapToMoviePosters(result)
      }
    )
  }

  adventureMovie(){
    this.service
      .fetchAdventureMovies()
      .subscribe( (result) => {
        this.adventureMoviesResult = mapToMoviePosters(result);
      }
    )
  }

  animationMovie(){
    this.service
      .fetchAnimationMovies()
      .subscribe( (result) => {
        this.animationMoviesResult = mapToMoviePosters(result);
      }
    )
  }

  comedyMovie(){
    this.service
      .fetchComedyMovies()
      .subscribe( (result) => {
        this.comedyMoviesResult = mapToMoviePosters(result);
      }
    )
  }

  documentaryMovie(){
    this.service
      .fetchDocumentaryMovies()
      .subscribe( (result) => {
        this.documentaryMoviesResult = mapToMoviePosters(result);
      }
    )
  }

  scienceFictionMovie(){
    this.service
      .fetchScienceFictionMovies()
      .subscribe( (result) => {
        this.scienceFictionMoviesResult = mapToMoviePosters(result);
      }
    )
  }

  thrillerMovie(){
    this.service
      .fetchThrillerMovies()
      .subscribe( (result) => {
        this.thrillerMoviesResult = mapToMoviePosters(result);
      }
    )
  }

}
