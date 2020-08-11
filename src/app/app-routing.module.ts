import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import {ChapterDetailComponent} from './chapter-detail/chapter-detail.component';

const routes: Routes = [
  { path: 'detail/:id', component: RecipeComponent },
  { path: 'chapter/:id', component: ChapterDetailComponent },
  { path: '', component: RecipesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
