import { Component, OnInit, Input } from '@angular/core';
import {RecipesNode} from '../../recipes-node';
import * as $ from 'jquery';

@Component({
  selector: 'app-chapter-entry',
  templateUrl: './chapter-entry.component.html',
  styleUrls: ['./chapter-entry.component.css']
})
export class ChapterEntryComponent implements OnInit {

  @Input() node: RecipesNode;
  constructor() { }

  ngOnInit(): void {
  }


}
