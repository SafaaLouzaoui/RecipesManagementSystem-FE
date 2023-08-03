import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategorieComponent } from './view-categorie.component';

describe('ViewCategorieComponent', () => {
  let component: ViewCategorieComponent;
  let fixture: ComponentFixture<ViewCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCategorieComponent]
    });
    fixture = TestBed.createComponent(ViewCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
