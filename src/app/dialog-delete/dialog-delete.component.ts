import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RecipesNode} from '../recipes-node';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})

export class DialogDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RecipesNode) {}
}
