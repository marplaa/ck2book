import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddRecipeComponent } from './dialog-add-recipe.component';

describe('DialogAddRecipeComponent', () => {
  let component: DialogAddRecipeComponent;
  let fixture: ComponentFixture<DialogAddRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
