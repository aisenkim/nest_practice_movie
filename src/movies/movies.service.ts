import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GetMovieFilterDto } from './dto/get-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private movieRepository: MovieRepository,
  ) {}

  async getMovies(filterDto: GetMovieFilterDto): Promise<Movie[]> {
    return this.movieRepository.getMovies(filterDto);
  }

  // getAll(): Movie[] {
  //   return this.movies;
  // }

  async getOne(id: number): Promise<Movie> {
    const found = await this.movieRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }

    return found;
  }

  async deleteOne(id: number): Promise<void> {
    const result = await this.movieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Movie with ID "${id}" not found`);
    }
  }

  async createMovie(movieData: CreateMovieDto): Promise<Movie> {
    const { title, year } = movieData;
    const movie = new Movie();
    movie.title = title;
    movie.year = year;
    await movie.save();

    return movie;
  }

  // createMovie(movieData: CreateMovieDto) {
  //   this.movies.push({
  //     id: this.movies.length + 1,
  //     ...movieData,
  //   });
  // }

  async update(id: number, movieData: UpdateMovieDto): Promise<Movie> {
    const movie = await this.getOne(id);
    const { title, year } = movieData;
    movie.title = title;
    movie.year = year;
    await movie.save();
    return movie;
  }
}
