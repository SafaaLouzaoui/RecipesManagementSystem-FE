import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecetteComponent } from './view-recette.component';

describe('ViewRecetteComponent', () => {
  let component: ViewRecetteComponent;
  let fixture: ComponentFixture<ViewRecetteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRecetteComponent]
    });
    fixture = TestBed.createComponent(ViewRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
