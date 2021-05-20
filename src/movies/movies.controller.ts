import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GetMovieFilterDto } from './dto/get-movies.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(
    @Query(ValidationPipe) filiterDto: GetMovieFilterDto,
  ): Promise<Movie[]> {
    return this.moviesService.getMovies(filiterDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.moviesService.getOne(id);
  }

  @Post('/')
  postOne(@Body() movieBody: CreateMovieDto): Promise<Movie> {
    return this.moviesService.createMovie(movieBody);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.update(id, updateData);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.moviesService.deleteOne(id);
  }
}

// add search, update patch with getting body, add post request to receive body
// using @Query and @Body
// npm run start:dev
