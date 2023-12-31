import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'
import { finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export interface Movie {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
}

interface MoviesObj {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Cast {
  character: string;
  original_name: string;
  profile_path: string | null; // profile_path can be null
  // Add more properties as needed
}

interface CastObj {
  id: number,
  cast: Cast[]
}


@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  constructor(private http: HttpClient) { }

  baseurl = environment.API_URL;
  apiKey = environment.API_KEY;


  //banner api data
  bannerApiData():Observable<Movie[]> {
    return this.http.get<MoviesObj>(`trending/all/week?api_key=`).pipe(
      map((result) => result.results.map(movie => ({
        id: movie.id,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        original_title: movie.original_title,
        overview: movie.overview
      }))),
      finalize(() => console.log('bannerApiData observable completed or error'))
    );
  }

  //trending movies api data
  trendingMovieApiData(): Observable<Movie[]> {
    return this.http.get<MoviesObj>(`trending/movie/day?api_key=`).pipe(
      map((result) => result.results.map(movie => ({
        id: movie.id,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        original_title: movie.original_title,
        overview: movie.overview
      })))
    );
  }

  //search movies
  getSearchMovie(movieName: string):Observable<Movie[]> {
    return this.http.get<MoviesObj>(`search/movie?query=${movieName}&api_key=`).pipe(
      map((result) => result.results.map(movie => ({
        id: movie.id,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        original_title: movie.original_title,
        overview: movie.overview
      })))
    );
  }

  //get movie details
  getMovieDetails(movieId: number):Observable<Movie> {
    return this.http.get<Movie>(`movie/${movieId}?api_key=`).pipe(
      map(movie => ({
        id: movie.id,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        original_title: movie.original_title,
        overview: movie.overview
      }))
    );
  }

  //get movie video
  getMovieVideo(movieId:number):Observable<string> {
    return this.http.get<any>(`movie/${movieId}/videos?api_key=`)
    .pipe(
      map((result) => {
        console.log(result, '#video result from service map operator');
        const trailerVideo = result.results.find((video:{type:string, key: string}) => video.type === 'Trailer');
        return trailerVideo ? trailerVideo.key : null;
      })
    );
  }

  //get movie cast
  getMovieCast(movieId: number):Observable<Cast[]> {
    return this.http.get<CastObj>(`movie/${movieId}/credits?api_key=`)
      .pipe(
        map( result => result.cast.map( actor => ({
          profile_path: actor.profile_path,
          original_name: actor.original_name,
          character: actor.character
        })))
      )
  }

  fetchMoviesByGenreId(genreId: number): Observable<Movie[]> {
    return this.http.get<MoviesObj>(`discover/movie?with_genres=${genreId}&api_key=`).pipe(
      map((result) => result.results.map(movie => ({
        id: movie.id,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        original_title: movie.original_title,
        overview: movie.overview
      })))
    );
  }

  fetchActionMovies():Observable<Movie[]> {
    return this.fetchMoviesByGenreId(28)
  }

  fetchAdventureMovies():Observable<Movie[]> {
    return this.fetchMoviesByGenreId(12)
  }

  fetchAnimationMovies():Observable<Movie[]> {
    return this.fetchMoviesByGenreId(16)
  }

  fetchComedyMovies():Observable<Movie[]> {
    return this.fetchMoviesByGenreId(35)
  }

  fetchDocumentaryMovies():Observable<Movie[]> {
    return this.fetchMoviesByGenreId(99)
  }

  fetchScienceFictionMovies():Observable<Movie[]> {
    return this.fetchMoviesByGenreId(878)
  }

  fetchThrillerMovies():Observable<Movie[]> {
    return this.fetchMoviesByGenreId(53)
  }

  // returnObservableBool(str: string):Observable<boolean> {
  //   if(str.length > 5){
  //     return of(true)
  //   }
  //   return of(false)
  // }

}
