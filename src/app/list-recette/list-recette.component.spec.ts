import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecetteComponent } from './list-recette.component';

describe('ListRecetteComponent', () => {
  let component: ListRecetteComponent;
  let fixture: ComponentFixture<ListRecetteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRecetteComponent]
    });
    fixture = TestBed.createComponent(ListRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
