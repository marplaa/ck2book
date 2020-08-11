import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDownloadBookComponent } from './dialog-download-book.component';

describe('DialogDownloadBookComponent', () => {
  let component: DialogDownloadBookComponent;
  let fixture: ComponentFixture<DialogDownloadBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDownloadBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDownloadBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
