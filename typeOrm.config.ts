import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/entities/user.entity';
import { Recipe } from './src/entities/recipe.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'zain13',
  database: 'cook.io',
  entities: [ User, Recipe],
  migrations: [],
});
