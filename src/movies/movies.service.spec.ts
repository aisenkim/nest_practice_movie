import { Test } from '@nestjs/testing';
import { GetMovieFilterDto } from './dto/get-movies.dto';
import { MovieRepository } from './movie.repository';
import { MoviesService } from './movies.service';

const mockUser = { username: 'Test User' };

const mockMovieRepository = () => ({
  getMovies: jest.fn(),
});

describe('Movies', () => {
  let moviesService;
  let movieRepository;

  // before every test, re-init
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: MovieRepository, useFactory: mockMovieRepository },
      ],
    }).compile();

    moviesService = await module.get<MoviesService>(MoviesService);
    movieRepository = await module.get<MovieRepository>(MovieRepository);
  });
  // ----------------- SETUP PART -----------------------------

  describe('getMovies', () => {
    it('gets all movies from the repository', async () => {
      movieRepository.getMovies.mockResolvedValue('someValue');

      expect(movieRepository.getMovies).not.toHaveBeenCalled();
      const filters: GetMovieFilterDto = { search: 'some search query' };
      const result = await moviesService.getMovies(filters);
      expect(movieRepository.getMovies).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
