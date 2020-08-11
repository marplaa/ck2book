import {Component, Input, OnInit} from '@angular/core';
import {Recipe, RecipesNode} from '../recipes-node';
import { RecipesService } from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {DialogDeleteComponent} from '../dialog-delete/dialog-delete.component';
import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe;
  modules = {toolbar: [
      ['bold', 'italic', 'underline']]
  };
  model: string;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private dialog: MatDialog) {
    this.recipe = recipesService.getRecipeById(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }

  outputContent(): void {
    console.log(this.model);
  }

  openDeleteDialog(chapter: RecipesNode): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: chapter
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
    });
  }

  delete(): void {
    this.recipesService.deleteNode(this.recipe.id);
    this.router.navigateByUrl('/');
  }


  saveAndExit(): void {
    this.recipesService.save();
    this.router.navigateByUrl('/');
  }


}
