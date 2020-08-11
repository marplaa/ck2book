import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddChapterComponent } from './dialog-add-chapter.component';

describe('DialogAddChapterComponent', () => {
  let component: DialogAddChapterComponent;
  let fixture: ComponentFixture<DialogAddChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
