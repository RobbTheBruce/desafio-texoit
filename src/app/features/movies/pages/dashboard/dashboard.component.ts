import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movies.service';
import { YearsWithMultipleWinners } from '../../interfaces/years-with-multiple-winners.interface';
import { StudioWithWinCount } from '../../interfaces/studio-with-win-count.interface';
import { MaxMinWinInterval } from '../../interfaces/max-min-win-interval.interface';
import { Movies } from '../../interfaces/movies.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  yearsWithMultipleWinner: YearsWithMultipleWinners = {
    years: [],
  };
  studiosWithWinCount: StudioWithWinCount = {
    studios: [],
  };
  maxMinWinInterval: MaxMinWinInterval = {
    min: [],
    max: [],
  };
  movies: Movies[] = [];

  inputYear!: string;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getYearsWithMultipleWinner();
    this.getStudioWithWinCount();
    this.getMaxMinWinInterval();
  }

  getYearsWithMultipleWinner() {
    this.movieService
      .get({ projection: 'years-with-multiple-winners' })
      .subscribe((data: YearsWithMultipleWinners) => {
        this.yearsWithMultipleWinner = data;
      });
  }
  getStudioWithWinCount() {
    this.movieService
      .get({ projection: 'studios-with-win-count' })
      .subscribe((data: StudioWithWinCount) => {
        this.studiosWithWinCount = data;
      });
  }

  getMaxMinWinInterval() {
    this.movieService
      .get({ projection: 'max-min-win-interval-for-producers' })
      .subscribe((data: MaxMinWinInterval) => {
        this.maxMinWinInterval = data;
      });
  }

  searchByYear() {
    if (this.inputYear) {
      this.movieService
        .get({ winner: true, year: this.inputYear || '' })
        .subscribe((data: Movies[]) => {
          this.movies = data;
        });
    }
  }
}
