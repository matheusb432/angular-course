import { AddMap } from 'mapper-ts/lib-esm';
import { Ingredient } from './../../shared/ingredient.model';
export class Recipe {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  @AddMap(Ingredient)
  ingredients: Ingredient[];

  constructor(
    id: number,
    name: string,
    desc: string,
    image: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = image;
    this.ingredients = ingredients;
  }

  static empty() {
    return new Recipe(0, '', '', '', []);
  }
}
