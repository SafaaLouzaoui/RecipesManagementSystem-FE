import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIngredientComponent } from './list-ingredient.component';

describe('ListIngredientComponent', () => {
  let component: ListIngredientComponent;
  let fixture: ComponentFixture<ListIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListIngredientComponent]
    });
    fixture = TestBed.createComponent(ListIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
