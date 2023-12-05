import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ListComponent } from './list.component';
import { MovieService } from '../../services/movies.service';
import { of } from 'rxjs';
import { MoviesModule } from '../../movies.module';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MovieService', ['get']);

    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [MoviesModule],
      providers: [{ provide: MovieService, useValue: spy }],
    });

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(
      MovieService
    ) as jasmine.SpyObj<MovieService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call MovieService to get movies on initialization', fakeAsync(() => {
    const mockData = {
      content: [],
      pageable: {
        sort: { unsorted: true, sorted: false, empty: true },
        offset: 0,
        pageSize: 10,
        pageNumber: 0,
        unpaged: false,
        paged: true,
      },
      last: true,
      totalPages: 0,
      totalElements: 0,
      size: 10,
      number: 0,
      sort: { unsorted: true, sorted: false, empty: true },
      first: true,
      numberOfElements: 0,
      empty: true,
    };
    movieServiceSpy.get.and.returnValue(of(mockData));

    fixture.detectChanges();
    tick();

    expect(component.movies).toEqual(mockData);
  }));

  it('should call MovieService with the correct parameters when calling getMovies', fakeAsync(() => {
    const mockData = {
      content: [],
      pageable: {
        sort: { unsorted: true, sorted: false, empty: true },
        offset: 0,
        pageSize: 10,
        pageNumber: 0,
        unpaged: false,
        paged: true,
      },
      last: true,
      totalPages: 0,
      totalElements: 0,
      size: 10,
      number: 0,
      sort: { unsorted: true, sorted: false, empty: true },
      first: true,
      numberOfElements: 0,
      empty: true,
    };
    movieServiceSpy.get.and.returnValue(of(mockData));

    component.getMovies();
    tick();

    expect(movieServiceSpy.get).toHaveBeenCalledWith({
      page: component.page,
      size: component.size,
      winner: component.inputWinner,
      year: component.inputYear,
    });
  }));
});
