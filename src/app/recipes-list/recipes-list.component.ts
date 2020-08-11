import {Component, Inject, OnInit} from '@angular/core';
import {Recipe, RecipesNode} from '../recipes-node';
import {Recipes} from '../skeleton';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ArrayDataSource} from '@angular/cdk/collections';
import { RecipesService } from '../recipes.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from 'ts-md5';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteComponent} from '../dialog-delete/dialog-delete.component';
import {DialogAddRecipeComponent} from '../dialog-add-recipe/dialog-add-recipe.component';
import {DialogAddChapterComponent} from '../dialog-add-chapter/dialog-add-chapter.component';
import {DialogDownloadBookComponent} from '../dialog-download-book/dialog-download-book.component';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  // recipes: RecipesNode;
  recipe: Recipe;
  chapter: RecipesNode;
  loading = false;

  renderOutput: string;

  newChapterTitle = '';
  newRecipeUrl: '';
  private test: any;


  constructor(public recipesService: RecipesService,
              private modalService: NgbModal,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.recipes = this.recipesService.recipes;
  }


  hasChild = (node: RecipesNode) => !!node.children && node.children.length > 0;

  selectRecipe(recipe: Recipe): void  {
    this.recipe = recipe;
  }



  showChapter(chapterID: string): void {
    const chapter = this.recipesService.getNodeById(chapterID);
    alert(chapter.title);
  }



/*  openNewChapterModal(content, chapter: string): void {
    this.chapter = this.recipesService.getNodeById(chapter);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === 's') {this.recipesService.addChapter(this.chapter, this.newChapterTitle); this.newChapterTitle = ''; }
    });
  }

  openNewRecipeModal(content, chapter: string): void {
    this.chapter = this.recipesService.getNodeById(chapter);
    this.modalService.open(content, {ariaLabelledBy: 'nr-title'}).result.then((result) => {
      if (result === 's') {this.recipesService.addRecipe(this.chapter, this.newRecipeUrl); this.newRecipeUrl = ''; }
    });
  }*/

  openAddRecipeDialog(chapter: string): void {
    this.chapter = this.recipesService.getNodeById(chapter);

    const dialogRef = this.dialog.open(DialogAddRecipeComponent, {
      data: this.chapter
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipesService.addRecipe(this.chapter, result);
      }
    });
  }

  openDownloadBookDialog(context, data): void {
    context.recipe = null;
    context.loading = false;
    const dialogRef = context.dialog.open(DialogDownloadBookComponent, {
      data
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openAddChapterDialog(chapter: string): void {
    this.chapter = this.recipesService.getNodeById(chapter);

    const dialogRef = this.dialog.open(DialogAddChapterComponent, {
      data: this.chapter
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipesService.addChapter(this.chapter, result);
      }
    });
  }

  openUploadModal(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log('Closed with: ${result}');
    }, (reason) => {
    });
  }


  upload(files: FileList): void {
    const fr = new FileReader();
    fr.onload = (e) => {
      const lines = e.target.result;
      if (typeof lines === 'string') {
        this.recipesService.updateRecipes(JSON.parse(lines));
      }// this.receivedText;
    };

    fr.readAsText(files[0]);
  }

  receivedText(e): void {
    const lines = e.target.result;
    console.log(JSON.parse(lines));
    console.log('in receivedText');
    this.test = JSON.parse(lines);
    this.recipesService.updateRecipes(JSON.parse(lines));
  }

  isRecipe(node: RecipesNode): boolean {
    return !node.children;
  }

  isBottomChapter(node: RecipesNode): boolean {
    return node.isBottomChapter;
  }

  renderHere(): void {
    // this.renderOutput = this.recipesService.render();
  }

  render(): void {
    this.loading = true;
    // const renderedBook = this.recipesService.render();
    this.recipesService.requestCompilation(this, this.openDownloadBookDialog);

  }

}
