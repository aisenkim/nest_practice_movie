import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get('search')
  // searchMovie(@Query('term') term: string) {
  //   return `The search term is: ${term}`;
  // }

  @Get(':id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  @Post('/')
  postOne(@Body() movieBody: CreateMovieDto) {
    return this.moviesService.createMovie(movieBody);
  }

  @Patch(':id')
  updateOne(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(id, updateData);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }
}

// add search, update patch with getting body, add post request to receive body
// using @Query and @Body
// npm run start:dev
