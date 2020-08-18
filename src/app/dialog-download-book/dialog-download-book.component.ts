import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../environments/environment';
import {RenderedBook} from '../renderer.service';
import {ChangeDetectorRef} from '@angular/core';


@Component({
  selector: 'app-dialog-download-book',
  templateUrl: './dialog-download-book.component.html',
  styleUrls: ['./dialog-download-book.component.css']
})
export class DialogDownloadBookComponent {

  webSocket: WebSocket;
  status: string;

  constructor(public dialogRef: MatDialogRef<DialogDownloadBookComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RenderedBook, private ref: ChangeDetectorRef) {
    this.webSocket = new WebSocket('ws://' + environment.websocketServer + '/ws/');

    this.webSocket.onmessage = this.onMessage;
    this.webSocket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly');
    };
    this.webSocket.onopen = (e) => this.webSocket.send(JSON.stringify({content: this.data.content, images: this.data.images}));
  }

  onMessage(e): void {
    const msg = JSON.parse(e.data);
    if (msg.type === 'message') {
      this.status = msg.data;
      this.ref.detectChanges();
      console.log(msg.data);
    } else if (msg.type === 'book') {
      console.log(msg.data);
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
