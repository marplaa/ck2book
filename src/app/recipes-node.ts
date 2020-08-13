import {newArray} from '@angular/compiler/src/util';
import {skipUntil} from 'rxjs/operators';
import {Options} from './options';


export interface RecipesNode {
  id: string;
  text: string;
  title: string;
  image?: string;
  images?: string[];
  children?: RecipesNode[];
  isBottomChapter?: boolean;
  options?: Options;
}

export class Recipe implements RecipesNode{
  url?: string;
  ingredients: string[][];
  image: string;
  images: string[];
  title: string;
  recipeInfo: string[][];
  id: string;
  text: string;
  hasImage: boolean;
  constructor(title: string) {
    this.title = title;
    this.image = 'assets/img/placeholder.png';
    this.images = [];
    this.ingredients = [];
    this.hasImage = false;
  }


}
