import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs';
import { Movie, MovieApiServiceService } from 'src/app/services/movie-api-service.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnDestroy {

  constructor(
    private service: MovieApiServiceService
  ){}

  searchResult: Movie[] = []
  private searchResultSub : Subscription = new Subscription();


  searchForm = new FormGroup({
    'movieName': new FormControl('')
  })

  ngOnDestroy(): void {
    this.searchResultSub.unsubscribe()
    console.log('unsubscribed from search movie result');
  }

  submitForm() {
    console.log(this.searchForm.value,'searchForm#');
    const movieName = this.searchForm.value.movieName ?? '';
    this.searchResultSub = this.service.getSearchMovie(movieName).subscribe( (result) => {
      console.log(result, 'searchMovie##');
      this.searchResult = result
    })
  }
}
