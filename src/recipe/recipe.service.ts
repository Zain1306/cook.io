import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from 'src/entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async findOne(id: number): Promise<Recipe> {
    return this.recipeRepository.findOne({ where: { id } });
  }

  async create(recipeData: Partial<Recipe>): Promise<Recipe> {
    const recipe = this.recipeRepository.create(recipeData);
    return this.recipeRepository.save(recipe);
  }

  // async update(id: number, recipeData: Partial<Recipe>): Promise<Recipe> {
  //   await this.recipeRepository.update(id, recipeData);
  //   return this.recipeRepository.findOne(id);
  // }

  async remove(id: number): Promise<void> {
    await this.recipeRepository.delete(id);
  }
}
