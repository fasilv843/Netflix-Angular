import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/services/movie-api-service.service';

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

  getMovieDetailResult: any;

  ngOnInit():void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId,'getParamId##');
    
    this.getMovie(getParamId)
    // this.getVideo(getParamId)
    // this.getCast(getParamId)
  }


  getMovie(id:any){
    this.service.getMovieDetails(id).subscribe( (result) => {
      console.log(result, 'getmovieDetails##');
      this.getMovieDetailResult = result;
    })
  }
}