import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movies.service';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { MoviesModule } from '../../movies.module';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MovieService', ['get']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [FormsModule, MoviesModule],
      providers: [{ provide: MovieService, useValue: spy }],
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(
      MovieService
    ) as jasmine.SpyObj<MovieService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize years with the last 10 years', () => {
    const currentYear = new Date().getFullYear();
    expect(component.years).toEqual(
      Array.from({ length: 10 }, (_, index) => currentYear - index)
    );
  });

  it('should call MovieService to get years with multiple winners on initialization', fakeAsync(() => {
    const mockData = {
      years: [
        { year: 1986, winnerCount: 2 },
        { year: 1990, winnerCount: 2 },
        { year: 2015, winnerCount: 2 },
      ],
    };
    movieServiceSpy.get
      .withArgs({ projection: 'years-with-multiple-winners' })
      .and.returnValue(of(mockData));

    fixture.detectChanges();
    tick();

    expect(component.yearsWithMultipleWinner).toEqual(mockData);
  }));

  it('should call MovieService to get studios with win count on initialization', fakeAsync(() => {
    const mockData = {
      studios: [
        { name: 'Columbia Pictures', winCount: 7 },
        { name: 'Paramount Pictures', winCount: 6 },
        { name: 'Warner Bros.', winCount: 5 },
        { name: '20th Century Fox', winCount: 4 },
        { name: 'MGM', winCount: 3 },
        { name: 'Universal Studios', winCount: 2 },
        { name: 'Universal Pictures', winCount: 2 },
        { name: 'Hollywood Pictures', winCount: 2 },
        { name: 'Nickelodeon Movies', winCount: 1 },
        { name: 'C2 Pictures', winCount: 1 },
        { name: 'Summit Entertainment', winCount: 1 },
        { name: 'Hasbro', winCount: 1 },
        { name: 'Associated Film Distribution', winCount: 1 },
        { name: 'Revolution Studios', winCount: 1 },
        { name: 'First Look Pictures', winCount: 1 },
        { name: 'Focus Features', winCount: 1 },
        { name: 'Cannon Films', winCount: 1 },
        { name: 'United Artists', winCount: 1 },
        { name: 'Touchstone Pictures', winCount: 1 },
        { name: 'Samuel Goldwyn Films', winCount: 1 },
        { name: 'Quality Flix', winCount: 1 },
        { name: 'TriStar Pictures', winCount: 1 },
        { name: 'Franchise Pictures', winCount: 1 },
        { name: 'Relativity Media', winCount: 1 },
        { name: 'Castle Rock Entertainment', winCount: 1 },
        { name: 'Screen Gems', winCount: 1 },
        { name: 'Triumph Releasing', winCount: 1 },
        { name: 'DreamWorks', winCount: 1 },
      ],
    };
    movieServiceSpy.get.withArgs(jasmine.objectContaining({ projection: 'studios-with-win-count' })).and.returnValue(of(mockData));

    fixture.detectChanges();
    tick();

    expect(component.studiosWithWinCount).toEqual(mockData);
  }));

  it('should call MovieService to get max-min win interval for producers on initialization', fakeAsync(() => {
    const mockData = {
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    };
    movieServiceSpy.get
      .withArgs({ projection: 'max-min-win-interval-for-producers' })
      .and.returnValue(of(mockData));

    fixture.detectChanges();
    tick();

    expect(component.maxMinWinInterval).toEqual(mockData);
  }));

  it('should call MovieService to search movies by year when searchByYear is called', fakeAsync(() => {
    const mockMovies = [
      {
        id: 197,
        year: 2018,
        title: 'Holmes & Watson',
        studios: ['Columbia Pictures'],
        producers: [
          'Adam McKay',
          'Clayton Townsend',
          'Jimmy Miller',
          'Will Ferrell',
        ],
        winner: true,
      },
    ];
    movieServiceSpy.get
      .withArgs({ winner: true, year: '2018' })
      .and.returnValue(of(mockMovies));

    component.inputYear = '2018';
    component.searchByYear();
    tick();

    expect(component.movies).toEqual(mockMovies);
  }));
});
