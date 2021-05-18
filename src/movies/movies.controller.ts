import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return `This will return `;
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This will return one movie ${id}`;
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return `This movie: ${id}, has been deleted`;
  }

  @Patch('/:id')
  updateOne(@Param('id') id: string) {
    return `This move: ${id}, has been updated`;
  }
}

// add search, update patch with getting body, add post request to receive body
// using @Query and @Body
// npm run start:dev
