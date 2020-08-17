import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe, RecipesNode} from './recipes-node';
import {Recipes} from './skeleton';
import {Md5} from 'ts-md5';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {ChapterImages} from './chapter-images';
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

  /** selected recipe */
  recipe: Recipe;

  /** selected chapter */
  chapter: RecipesNode = {id: '', title: '', children: [], image: '', text: '', options: standardOptions};

  webSocket: WebSocket;


  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService, private renderer: RendererService) {
    if (this.storage.has('book')) {
      const loadedRecipes = JSON.parse(this.storage.get('book'));
      if (loadedRecipes) {
        this.recipes = loadedRecipes;
      }
    }

    this.renderer.recipesService = this;
  }

  /**
   * Scrapes a recipe at the given url with the ck2bookServer
   * @param url
   */
  getRecipeFromUrl(url: string): Observable<Recipe> {
    const reqUrl = environment.ck2bookServer + '/get/get_recipe_data_json_get?url=' + url;
    return this.http.get<Recipe>(reqUrl);
  }

  /**
   * Gets recipe by the recipe id
   * @param id The id of the wanted recipe
   */
  getRecipeById(id: string): Recipe {
    return this.getNodeById(id) as Recipe;
  }

  /**
   * Gets the node with id "id"
   * @param id The id of the wanted node
   */
  getNodeById(id: string): RecipesNode {
    const idArray = id.split('-');
    return this.getNodeByIdRec(idArray);
  }

  /**
   * Returns the parent of the node with id "id"
   * @param id The id of the node the parent is wanted for
   */
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
  }

  /**
   * Downloads the current recipes object to the client
   */
  downloadBook(): void {
    const blob = new Blob([JSON.stringify(this.recipes)], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'Mein Kochbuch.txt');
  }

  /**
   * Parses the list of urls, ids or titles and scrapes them
   * @param chapter The chapter to add the recipes to
   * @param urls Single line or newline separated list of urls, ids or titles
   */
  addRecipe(chapter: RecipesNode, urls: string): void {

    for (let r of urls.split('\n')) {
      if (r.startsWith('http')) {
        if (r.startsWith('https://www.chefkoch.de/')) {
          this.scrapeRecipe(chapter, r);
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

  /**
   * Gets the Recipe object with the specified url from the ck2bookServer server
   *
   * @param chapter The chapter to add the recipe to
   * @param url The url of the recipe to scrape
   */
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

  /**
   * Adds a new and empty recipe with title "title" under the chapter "chapter"
   *
   * @param chapter The chapter to add the new recipe to
   * @param title The title of the recipe
   */
  newRecipe(chapter: RecipesNode, title: string): void {
    const newRecipe = new Recipe(title);
    newRecipe.id = this.generateId(chapter, title);
    newRecipe.hasImage = false;
    chapter.children.push(newRecipe);
    this.save();

  }

  /**
   * Generates a unique id for a node
   * @param parent The parent node of the node the id is for
   * @param text The text that should be unique in the namespace of the parent
   */
  generateId(parent: RecipesNode, text: string): string {
    let id = 'x';
    do {
      id = parent.id + '-' + Md5.hashStr(text + id).toString().substr(0, 3);
    } while (parent.children.find(node => node.id === id));
    return id;
  }

  /**
   * Adds a new chapter with the given title under the given chapter
   * @param chapter The chapter to add the new chapter to
   * @param title The title of the new chapter
   */
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

  /**
   * Saves the current recipes object as json to the local storage
   */
  save(): void {
    this.storage.set('book', JSON.stringify(this.recipes));
  }

  /**
   * Reinitializes the recipes object to the defaults
   */
  delete(): void {
    this.storage.set('book', JSON.stringify(Recipes));
    this.recipes = Recipes;
  }

  /**
   * Deletes a node from the recipes tree
   * @param nodeId The id of the node to delete
   */
  deleteNode(nodeId: string): void {
    const parent = this.getParentNodeById(nodeId);
    parent.children = parent.children.filter(child => child.id !== nodeId);
    if (parent.isBottomChapter && parent.children.length === 0) {
      parent.isBottomChapter = false;
    }
    this.save();
  }

  /**
   * sets the recipes object to the given recipes object (e.g. after loading it from a file)
   * @param recipes The new recipes object
   */
  updateRecipes(recipes: RecipesNode): void {
    this.recipes = recipes;
    this.save();
  }

  /**
   * Start compilation of the recipes object.
   * @param context Reference to the component that requested the compilation
   * @param callback Callback function that is called when the compilation is complete
   */
  requestCompilation(context, callback): void {
    const url = environment.ck2bookServer + '/compile/toPdf';

    // const renderer = new Renderer();
    const renderedBook = this.renderer.render(this.recipes);
    this.http.post<CompilationResponse>(url, {content: renderedBook.content, images: renderedBook.images})
      .subscribe(data => callback(context, data));
  }

  /*bookReady(data): void {
    console.log(data.url);
  }*/

  /*render(): RenderedBook {
    // const renderer = new Renderer();
    return this.renderer.render(this.recipes);
  }*/

  websocketTest(): void {
    this.webSocket = new WebSocket('ws://' + environment.websocketServer + '/ws/');

    this.webSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'message') {
        console.log(data.data);
      } else if (data.type === 'book') {
        console.log(data.data);
      }

    };
    this.webSocket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly');
    };


  }

  sendWebSocketMsg(): void {
    const renderedBook = this.renderer.render(this.recipes);
    this.webSocket.send(JSON.stringify({content: renderedBook.content, images: renderedBook.images}));
  }


}
