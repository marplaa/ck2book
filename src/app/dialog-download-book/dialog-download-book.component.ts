import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-download-book',
  templateUrl: './dialog-download-book.component.html',
  styleUrls: ['./dialog-download-book.component.css']
})
export class DialogDownloadBookComponent {

  constructor(public dialogRef: MatDialogRef<DialogDownloadBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
