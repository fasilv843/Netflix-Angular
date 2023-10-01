import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cast, Movie, MovieApiServiceService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  constructor(
    private service:MovieApiServiceService,
    private router: ActivatedRoute
  ){}

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


  getMovie(id:number){
    this.service.getMovieDetails(id).subscribe( (result) => {
      console.log(result, 'getmovieDetails##');
      this.getMovieDetailResult = result;
    })
  }

  getVideo(id:number){
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getMovieVideo#');
      this.getMovieVideoResult = result;
    })
  }

  getMovieCast(id:number){
    this.service.getMovieCast(id).subscribe( (result) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result;
    })
  }
}
