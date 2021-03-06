import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipes-node';

@Component({
  selector: 'app-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.css']
})
export class RecipePreviewComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

}
