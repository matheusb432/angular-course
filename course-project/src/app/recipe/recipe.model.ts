import { AddMap } from 'mapper-ts/lib-esm';
import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  @AddMap('key')
  id?: string;
  name: string;
  description: string;
  imagePath: string;
  @AddMap(Ingredient)
  ingredients: Ingredient[] = [];

  constructor(
    name: string,
    desc: string,
    image: string,
    ingredients: Ingredient[] = []
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = image;
    this.ingredients = ingredients;
  }

  static empty() {
    return new Recipe('', '', '', []);
  }
}
