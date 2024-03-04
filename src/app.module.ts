import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from './recipe/recipe.module';
import { Recipe } from './entities/recipe.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'zain13',
      database: 'cook.io',
      entities: [Recipe,User],
      synchronize: true,
    }),
    RecipeModule,
  ],
})
export class AppModule {}
