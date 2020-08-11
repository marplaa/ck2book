import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RecipesNode} from '../recipes-node';

@Component({
  selector: 'app-dialog-add-chapter',
  templateUrl: './dialog-add-chapter.component.html',
  styleUrls: ['./dialog-add-chapter.component.css']
})
export class DialogAddChapterComponent {

  chapterTitle: string;

  constructor(public dialogRef: MatDialogRef<DialogAddChapterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RecipesNode) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
