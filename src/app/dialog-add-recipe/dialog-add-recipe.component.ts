import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RecipesNode} from '../recipes-node';

@Component({
  selector: 'app-dialog-add-recipe',
  templateUrl: './dialog-add-recipe.component.html',
  styleUrls: ['./dialog-add-recipe.component.css']
})
export class DialogAddRecipeComponent {

  recipesUrls: string;

  constructor(public dialogRef: MatDialogRef<DialogAddRecipeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RecipesNode) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
