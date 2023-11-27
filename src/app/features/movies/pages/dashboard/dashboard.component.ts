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

  inputYear: string = '';
  years!: number[];

  constructor(private movieService: MovieService) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, index) => currentYear - index);
  }

  ngOnInit(): void {
    this.movieService
      .get({ projection: 'years-with-multiple-winners' })
      .subscribe((data: YearsWithMultipleWinners) => {
        this.yearsWithMultipleWinner = data;
      });

    this.movieService
      .get({ projection: 'studios-with-win-count' })
      .subscribe((data: StudioWithWinCount) => {
        this.studiosWithWinCount = data;
      });
    this.movieService
      .get({ projection: 'max-min-win-interval-for-producers' })
      .subscribe((data: MaxMinWinInterval) => {
        this.maxMinWinInterval = data;
      });
  }

  searchByYear() {
    if (this.inputYear) {
      this.movieService
        .get({ winner: true, year: this.inputYear })
        .subscribe((data: Movies[]) => {
          this.movies = data;
        });
    }
  }
}
