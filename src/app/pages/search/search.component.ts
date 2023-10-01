import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Movie, MovieApiServiceService } from 'src/app/services/movie-api-service.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  constructor(
    private service: MovieApiServiceService
  ){}

  searchResult: Movie[] = []

  searchForm = new FormGroup({
    'movieName': new FormControl('')
  })

  submitForm() {
    console.log(this.searchForm.value,'searchForm#');
    const movieName = this.searchForm.value.movieName ?? '';
    this.service.getSearchMovie(movieName).subscribe( (result) => {
      console.log(result, 'searchMovie##');
      this.searchResult = result
    })
  }
}
