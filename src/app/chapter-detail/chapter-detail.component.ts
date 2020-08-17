import { Component, OnInit } from '@angular/core';
import {RecipesNode} from '../recipes-node';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogDeleteComponent} from '../dialog-delete/dialog-delete.component';
import {ChapterImages} from '../chapter-images';



@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.css']
})
export class ChapterDetailComponent implements OnInit {

  modules = {toolbar: [
      ['bold', 'italic', 'underline']]
  };
  model: string;
  chapter: RecipesNode;
  chapterImages = ChapterImages.getImages();


  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.chapter = this.recipesService.getNodeById(this.route.snapshot.paramMap.get('id'));
    // this.chapterImages.concat(this.chapter.images);
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
    this.recipesService.deleteNode(this.chapter.id);
    this.router.navigateByUrl('/');
  }

  saveAndExit(): void {
    this.recipesService.save();
    this.router.navigateByUrl('/');
  }

}
