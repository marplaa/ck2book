import { Injectable } from '@angular/core';
import {RecipesService} from './recipes.service';
import {RecipesNode} from './recipes-node';
import {twoColTemplate} from './latex-2-column-template';
import {Md5} from 'ts-md5';


export interface RenderedBook {
  id: string;
  content: string;
  images: Image[];
}

interface Size {
  size: string;
  filter: {};
}

interface Image {
  url: string;
  sizes: Size[];
}

@Injectable({
  providedIn: 'root'
})
export class RendererService {

  imageList: Image[] = [];
  sourcesList = '\n \\newpage \n \\chapter{Quellen}\n  \\begin{tiny} \n';
  recipesService: RecipesService;

  constructor() {
  }

  render(node: RecipesNode): RenderedBook {

    const nodes = this.renderNode(node);
    const content = twoColTemplate.frame.replace('{{content}}', nodes + this.sourcesList + '\n \\end{tiny} \n');
    const id = '' + Md5.hashStr(content);
    const images = this.imageList;
    this.imageList = [];
    this.sourcesList = '';
    return {id, content, images};
  }

  renderNode(node: RecipesNode): string {

    let item;
    let renderedItem;
    let output = '';
    for (item of node.children) {

      if (item.children) { // if chapter
        if (item.isBottomChapter) {
          renderedItem = twoColTemplate.chapter.replace('{{title}}', item.title);
        } else {
          renderedItem = twoColTemplate.chapter_w_subchapters.replace('{{title}}', item.title);
        }
        let text = '';
        if (item.text !== null) {
          text = '\\begin{mytextbox}' + this.htmlToTex(item.text) + '\\end{mytextbox}\n';
        }
        renderedItem = renderedItem.replace('{{text}}', text);

        if (item.options.background === 'IMAGE'){
          renderedItem = renderedItem.replace('{{bg-image}}',
            twoColTemplate.background.replace('{{bg-image}}',
              Md5.hashStr(item.image) + '-' + twoColTemplate.chapterImageRes));
        } else {
          renderedItem = renderedItem.replace('{{bg-image}}', '');
        }

        let sizes;
        if (item.options.recipeBackgrounds === 'CHAPTER') {
          sizes = [{size: twoColTemplate.chapterImageRes, filter: {}},
            {size: twoColTemplate.chapterImageRes, filter: {color: 0.3, brightness: 1.5, blur: 15}}] ;
        } else {
          sizes = [{size: twoColTemplate.chapterImageRes, filter: {}}];
        }
        let img: Image;
        // check if image is already in list
        const imageInList = this.imageList.filter(image => image.url === item.image);
        if (imageInList.length === 0) {
          img = { url: item.image, sizes };
          this.imageList.push(img);
        } else {
          // is already in list
          if (sizes.length > imageInList[0].sizes.length) {
            imageInList[0].sizes = sizes;
          }
        }


        if (item.children.length > 0) {
          output += renderedItem.replace('{{children}}', this.renderNode(item));
        } else {
          output += renderedItem.replace('{{children}}', '');
        }

      } else {
        // item is a recipe
        renderedItem = twoColTemplate.recipe.replace('{{title}}', item.title);
        renderedItem = renderedItem.replace('{{text}}', this.htmlToTex(item.text));
        renderedItem = renderedItem.replace('{{ingredients}}', this.renderTable(item.ingredients));
        if (item.hasImage) {
          const imageSnippet = '\\begin{center}\n \\includegraphics[width=8cm]{' + Md5.hashStr(item.image) + '-' + twoColTemplate.recipeImageRes + '}\n' + '  \\end{center}\n';
          renderedItem = renderedItem.replace('{{image}}', imageSnippet );

          const parent = this.recipesService.getParentNodeById(item.id);
          if (parent.options.recipeBackgrounds === 'RECIPE') {
            renderedItem = renderedItem.replace('{{bg-image}}',
              twoColTemplate.background.replace('{{bg-image}}',
                Md5.hashStr(item.image) + '-' + twoColTemplate.recipeBgImageRes + '-f'));
          } else if (parent.options.recipeBackgrounds === 'CHAPTER') {
            renderedItem = renderedItem.replace('{{bg-image}}',
              twoColTemplate.background.replace('{{bg-image}}',
                Md5.hashStr(parent.image) + '-' + twoColTemplate.recipeBgImageRes + '-f'));
          } else {
            renderedItem = renderedItem.replace('{{bg-image}}', '');
          }
        } else {
          renderedItem = renderedItem.replace('{{image}}', '');
          renderedItem = renderedItem.replace('{{bg-image}}', '');
        }

        if (item.hasImage && this.imageList.filter(img => img.url === item.image).length === 0) {
          const img: Image = {
            url: item.image, sizes: [{size: twoColTemplate.recipeImageRes, filter: {}},
              {size: twoColTemplate.recipeBgImageRes, filter: {color: 0.3, brightness: 1.5, blur: 15}}]
          };
          this.imageList.push(img);
        }
        output += renderedItem;

        if (item.url !== '') {
          const chaptersString = this.getChaptersAsString(item);
          this.sourcesList += chaptersString.substring(3, chaptersString.length) + '\\\\ \n \\textit{' + item.url + '} \\\\ \\\\ \n';
        }
      }

    }

    return output;

  }

  getChaptersAsString(recipe: RecipesNode): string {
    if (recipe.id === '000') {
      return '';
    } else {
      return this.getChaptersAsString(this.recipesService.getParentNodeById(recipe.id)) + ' - ' + recipe.title;
    }
  }

  htmlToTex(text: string): string {
    // replace <strong>
    text = this.texSave(text);
    let regex = /<\s*strong[^>]*>(.*?)<\s*\/\s*strong>/g;
    let tags = text.match(regex);
    if (tags) {
      for (const tag of tags) {

        const newTag = '\\textbf{' + tag.replace('<strong>', '').replace('</strong>', '') + '}';

        text = text.replace(tag, newTag);
      }
    }

    // replace <p>
    regex = /<\s*p[^>]*>(.*?)<\s*\/\s*p>/g;
    tags = text.match(regex);
    if (tags) {
      for (const tag of tags) {

        const newTag = tag.replace('<p>', '').replace('</p>', '') + '\\newline\n';

        text = text.replace(tag, newTag);
      }
    }

    // replace <u>
    regex = /<\s*u[^>]*>(.*?)<\s*\/\s*u>/g;
    tags = text.match(regex);
    if (tags) {
      for (const tag of tags) {

        const newTag = '\\uline{' + tag.replace('<u>', '').replace('</u>', '') + '}';

        text = text.replace(tag, newTag);
      }
    }

    // replace <em> = italic
    regex = /<\s*em[^>]*>(.*?)<\s*\/\s*em>/g;
    tags = text.match(regex);
    if (tags) {
      for (const tag of tags) {

        const newTag = '\\textit{' + tag.replace('<em>', '').replace('</em>', '') + '}';

        text = text.replace(tag, newTag);
      }
    }


    text = text.replace(/<\/br>/g, ' \\\\\n');
    text = text.replace(/<br>/g, ' \\\\\n');
    text = text.replace(/%/g, '\\%');

    return text;
  }


  texSave(text: string): string {
    text = text.replace(/%/g, '\\%');
    // text = text.replace(/⅛/g, '1/8');
    text = text.replace(/\\/g, '\\\\');
    return text;
  }

  renderTable(ingredients: string[]): string {

    let table = '\\begin{tabulary}{8cm}{R|L}\n';
    for (const ingredient of ingredients) {
      if ( ingredient.length === 2) {
        table += this.texSave(ingredient[0]) + ' & ' + this.texSave(ingredient[1]) + ' \\\\\n';
      } else if (ingredient.length === 1) {
        if (ingredient[0] !== '') {
          table += '\\hline\n\\textbf{' + this.texSave(ingredient[0]) +  '} \\\\\n';
        }
      }
    }
    table += '\\end{tabulary}\n';
    return table;
  }
}
