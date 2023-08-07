import { Ingredient } from './../models/ingredient';
import { Component } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.css']
})
export class ListIngredientComponent {
  ingredients: Ingredient[]=[]
  selectedIngredients: any;

  constructor(private IngredientService: IngredientService, private route: Router) {}

  ngOnInit(): void {
    this.fetchIngredient();


  }

  fetchIngredient(): void {
    this.IngredientService.getIngredients().subscribe(
      (data: any) => {
        this.ingredients = data;
    },
    error => {
      console.log('Une erreur s\'est produite lors du chargement des catégories : ', error);
    }
   );

  }
  deleteIngredient(id: number): void {
    if (confirm('Are you sure you want to delete ?')) {
      this.IngredientService.deleteIngredient(id).subscribe(
        () => {
         this.route.navigate(['/ingredients']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  updateIngredient(id: number): void {
    this.route.navigate(['ingredients/update',id]);
  }


}
