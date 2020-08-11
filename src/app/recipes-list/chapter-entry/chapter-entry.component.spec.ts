import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterEntryComponent } from './chapter-entry.component';

describe('ChapterEntryComponent', () => {
  let component: ChapterEntryComponent;
  let fixture: ComponentFixture<ChapterEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
