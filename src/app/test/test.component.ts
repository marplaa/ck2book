import { Component, OnInit } from '@angular/core';
import {Recipe, RecipesNode} from '../recipes-node';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ArrayDataSource} from '@angular/cdk/collections';
import {Recipes} from '../skeleton';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  // recipes: RecipesNode[] = Recipes;

  // treeControl = new NestedTreeControl<RecipesNode> (node => node.children);
  // dataSource = new ArrayDataSource(this.recipes);

  constructor() { }

  ngOnInit(): void {
    // this.createRecipes();
  }

  createRecipes(): void {
    // const recipe: Recipe = {images: [], title: 'tresssst', ingredients: [], image: ''};
    // recipe.title = 'test title';
   // this.recipes[0].children.push(recipe);
   // console.log(this.recipes);
  }

  hasChild = (_: number, node: RecipesNode) => !!node.children && node.children.length > 0;


}
