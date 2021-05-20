import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [MoviesModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
