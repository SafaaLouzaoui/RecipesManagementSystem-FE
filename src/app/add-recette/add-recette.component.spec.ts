import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecetteComponent } from './add-recette.component';

describe('AddRecetteComponent', () => {
  let component: AddRecetteComponent;
  let fixture: ComponentFixture<AddRecetteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecetteComponent]
    });
    fixture = TestBed.createComponent(AddRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
