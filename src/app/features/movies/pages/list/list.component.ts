import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movies.service';
import { MoviesDetail } from '../../interfaces/movies-detail.interface';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
})
export class ListComponent implements OnInit {
  movies!: MoviesDetail;
  inputYear: string = '';
  inputWinner: string = '';
  page: number = 0;
  size: number = 10;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService
      .get({
        page: this.page,
        size: this.size,
        winner: this.inputWinner || '',
        year: this.inputYear || '',
      })
      .subscribe((data: MoviesDetail) => {
        this.movies = data;
      });
  }

  nextPage() {
    if (this.page + 1 != this.movies?.totalPages) {
      this.page = this.page + 1;
      this.getMovies();
    }
  }
  prevPage() {
    if (this.page != 0) {
      this.page = this.page - 1;
      this.getMovies();
    }
  }
}
