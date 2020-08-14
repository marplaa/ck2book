import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe, RecipesNode} from './recipes-node';
import {Recipes} from './skeleton';
import {Md5} from 'ts-md5';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {ChapterImages} from './chapter-images';
import {RenderedBook} from './renderer.service';
import {standardOptions} from './options';
import {RendererService} from './renderer.service';
import {saveAs} from 'file-saver';
import {environment} from '../environments/environment';

interface CompilationResponse {
  url: string;
}


@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipes = Recipes;
  recipe: Recipe;
  chapter: RecipesNode = {id: '', title: '', children: [], image: '', text: '', options: standardOptions};

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService, private renderer: RendererService) {
    if (this.storage.has('book')) {
      const loadedRecipes = JSON.parse(this.storage.get('book'));
      if (loadedRecipes) {
        this.recipes = loadedRecipes;
      }
    }

    this.renderer.recipesService = this;
  }

  getRecipeFromUrl(url: string): Observable<Recipe> {
    const reqUrl = environment.ck2bookServer + '/get/get_recipe_data_json_get?url=' + url;
    return this.http.get<Recipe>(reqUrl);
  }

  getRecipeById(id: string): Recipe {
    return this.getNodeById(id) as Recipe;
  }

  getNodeById(id: string): RecipesNode {
    const idArray = id.split('-');
    return this.getNodeByIdRec(idArray);
  }

  getParentNodeById(id: string): RecipesNode {
    const idArray = id.split('-');
    idArray.pop();
    return this.getNodeByIdRec(idArray);
  }

  getNodeByIdRec(id: string[]): RecipesNode {
    if (id.length === 1) {
      return this.recipes; // chapter.children.find(chptr => chptr.id === id.join('-'));
    }
    const parentChapter = this.getNodeByIdRec(id.slice(0, id.length - 1));
    return parentChapter.children.find(chptr => chptr.id === id.join('-'));
    // return this.getNodeByIdRec(childChapter, id);

    /*const path = id.split('-');
    let currentChapter = (this.recipes)[0];

    let i: number;
    for (i = 1; i < path.length - 1; i++) {
      currentChapter = currentChapter.children.find(chapter => chapter.id === path[i]);
    }
    currentChapter = currentChapter.children.find(chapter => chapter.id === path[i]);

    // alert(currentChapter["text"]);
    return currentChapter;*/
  }

  downloadBook(): void {
    const blob = new Blob([JSON.stringify(this.recipes)], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'Mein Kochbuch.txt');
  }

  addRecipe(chapter: RecipesNode, urls: string): void {

    for (let r of urls.split('\n')) {
      if (r.startsWith('http')) {
        if (r.startsWith('https://www.chefkoch.de/')) {
          const url = r;
          this.scrapeRecipe(chapter, url);
        } else {
        }
      } else if (!isNaN(Number(r))) {
        const url = 'https://www.chefkoch.de/rezepte/' + r;
        this.scrapeRecipe(chapter, url);
      } else if (r.indexOf('.') === -1) {
        // is a new recipe title
        this.newRecipe(chapter, r);
      }
    }
    chapter.isBottomChapter = true;
  }

  scrapeRecipe(chapter: RecipesNode, url: string): void {
    this.getRecipeFromUrl(url)
      .subscribe(recipe => {
          console.log(recipe.recipeInfo);
          recipe.id = this.generateId(chapter, recipe.title);
          recipe.hasImage = true;
          this.recipe = recipe;
          chapter.children.push(recipe);
          this.save();
        }
      );
  }

  newRecipe(chapter: RecipesNode, title: string): void {
    const newRecipe = new Recipe(title);
    newRecipe.id = this.generateId(chapter, title);
    newRecipe.hasImage = false;
    chapter.children.push(newRecipe);
    this.save();

  }

  generateId(parent: RecipesNode, text: string): string {
    let id = 'x';
    do {
      id = parent.id + '-' + Md5.hashStr(text + id).toString().substr(0, 3);
    } while (parent.children.find(node => node.id === id));
    return id;
  }


  /*
  * Adds a new chapter to the recipes tree.
  *
  * chapter: parent chapter to add the new chapter to
  *
  * */

  addChapter(chapter: RecipesNode, title: string): void {
    const newId = this.generateId(chapter, this.chapter.title);

    const newChapter = {
      id: newId,
      image: ChapterImages.getImages()[0],
      title,
      text: '',
      isBottomChapter: false,
      children: [],
      options: {
        recipeBackgrounds: 'RECIPE',
        background: 'IMAGE'
      }
    };
    chapter.children.push(newChapter);
    this.save();
  }

  save(): void {
    this.storage.set('book', JSON.stringify(this.recipes));
  }

  delete(): void {
    this.storage.set('book', JSON.stringify(Recipes));
    this.recipes = Recipes;
  }

  deleteNode(nodeId: string): void {
    const parent = this.getParentNodeById(nodeId);
    parent.children = parent.children.filter(child => child.id !== nodeId);
    if (parent.isBottomChapter && parent.children.length === 0) {
      parent.isBottomChapter = false;
    }
    this.save();
  }

  updateRecipes(recipes: RecipesNode): void {
    this.recipes = recipes;
    this.save();
  }

  requestCompilation(context, callback): void {
    const url = environment.ck2bookServer + '/compile/toPdf';

    // const renderer = new Renderer();
    const renderedBook = this.renderer.render(this.recipes);
    this.http.post<CompilationResponse>(url, {content: renderedBook.content, images: renderedBook.images})
      .subscribe(data => callback(context, data));
  }

  bookReady(data): void {
    console.log(data.url);
  }

  render(): RenderedBook {
    // const renderer = new Renderer();
    return this.renderer.render(this.recipes);
  }


}
