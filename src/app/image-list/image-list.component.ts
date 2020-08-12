import {Component, Input, OnInit} from '@angular/core';
import {Recipe, RecipesNode} from '../recipes-node';
import {chapterImages} from '../chapter-images';



@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  @Input() node: RecipesNode;
  @Input() images: string[];
  page = 0;
  displayedImages: string[];


  constructor() { }

  ngOnInit(): void {
    this.displayedImages = this.images.slice(0, 8);
  }

  selectPage(direction: number): void {
    const numPages = Math.ceil(this.images.length / 8);
    this.page = (this.page + direction + numPages) % numPages;

    this.displayedImages = this.images.slice(this.page * 8, this.page * 8 + 8);
  }

}
