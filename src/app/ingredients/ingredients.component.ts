import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Recipe} from '../recipes-node';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  @Input() recipe: Recipe;
  newIngredient: string;
  newIngredientAmount: string;
  constructor() { }

  ngOnInit(): void {
  }

  drop0(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.recipe.ingredients, event.previousIndex, event.currentIndex);
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.recipe.ingredients, event.previousIndex, event.currentIndex);
    } else {
      this.recipe.ingredients.splice(event.previousIndex, 1);
    }
  }

  addIngredient(): void {
    this.recipe.ingredients.push([this.newIngredientAmount, this.newIngredient]);
    this.newIngredientAmount = '';
    this.newIngredient = '';
  }

}
