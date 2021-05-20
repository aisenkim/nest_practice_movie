import { EntityRepository, Repository } from 'typeorm';
import { GetMovieFilterDto } from './dto/get-movies.dto';
import { Movie } from './movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async getMovies(filterDto: GetMovieFilterDto): Promise<Movie[]> {
    let { search } = filterDto;
    const query = this.createQueryBuilder('movie');

    if (search) {
      search = search.toLowerCase();
      query.andWhere(`LOWER(movie.title) LIKE LOWER(:search)`, {
        search: `%${search}%`,
      });
    }

    const movies = query.getMany();
    return movies;
  }
}
