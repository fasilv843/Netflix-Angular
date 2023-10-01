import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cast, Movie, MovieApiServiceService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnDestroy {

  constructor(
    private service: MovieApiServiceService,
    private router: ActivatedRoute
  ){}

  private movieDetailsSub: Subscription = new Subscription();
  private movieVideoSub: Subscription = new Subscription();
  private movieCastSub: Subscription = new Subscription();

  getMovieDetailResult: Movie;
  getMovieVideoResult: string;
  getMovieCastResult: Cast[];

  ngOnInit():void {
    let getParamId = Number(this.router.snapshot.paramMap.get('id'))
    console.log(getParamId,'getParamId##');
    
    this.getMovie(getParamId)
    this.getVideo(getParamId)
    this.getMovieCast(getParamId)
  }

  ngOnDestroy(): void {
    this.movieDetailsSub.unsubscribe()
    this.movieVideoSub.unsubscribe()
    this.movieCastSub.unsubscribe()
    console.log('unsubscribed from movie details cast video');
  }


  getMovie(id:number){
    this.movieDetailsSub = this.service.getMovieDetails(id).subscribe( (result) => {
      console.log(result, 'getmovieDetails##');
      this.getMovieDetailResult = result;
    })
  }

  getVideo(id:number){
    this.movieVideoSub = this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getMovieVideo#');
      this.getMovieVideoResult = result;
    })
  }

  getMovieCast(id:number){
    this.movieCastSub = this.service.getMovieCast(id).subscribe( (result) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result;
    })
  }
}
