import { Component, OnInit } from '@angular/core';
import {RecipesService} from '../recipes.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public recipesService: RecipesService) { }

  ngOnInit(): void {
  }

}
