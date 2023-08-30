import { Ingredient } from './../models/ingredient';
import { Component } from '@angular/core';
import { IngredientService } from '../services/ingredient.service';
import { Router } from '@angular/router';
import { PersonneService } from '../services/personne.service';
import { Personne } from '../models/personne';

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.css'],
})
export class ListIngredientComponent {
  ingredients: Ingredient[] = [];
  authUser: Personne = {};
  filteredIngredients: Ingredient[] = []; // Replace 'any' with the actual type of your categories
  selectedIngredients: any; // Replace 'any' with the actual type of your category
  recommendedIngredients: Ingredient[] = [];

  constructor(
    private IngredientService: IngredientService,
    private route: Router,
    private personneService: PersonneService
  ) {}

  ngOnInit(): void {
    this.fetchIngredient();
    this.getAuthenticatedUser();
  }
  refreshPage() {
    // Reload the current page to display the updated comments
    window.location.reload();
  }

  fetchIngredient(): void {
    this.IngredientService.getIngredients().subscribe(
      (data: any) => {
        this.ingredients = data;
        this.filteredIngredients = [...this.ingredients];
      },
      (error) => {
        console.log(
          "Une erreur s'est produite lors du chargement des catégories : ",
          error
        );
      }
    );
  }
  deleteIngredient(id: number): void {
    if (confirm('Are you sure you want to delete ?')) {
      this.IngredientService.deleteIngredient(id).subscribe(
        () => {
          this.refreshPage();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  updateIngredient(id: number): void {
    this.route.navigate(['ingredients/update', id]);
  }

  filterIngredients() {
    if (this.selectedIngredients) {
      // If a search query is entered, filter the categories based on it
      const filterValue = this.selectedIngredients.toLowerCase();
      this.filteredIngredients = this.ingredients.filter((ingredients) =>
        ingredients.nom?.toLowerCase().includes(filterValue)
      );
      // Generate recommended categories based on the filter value
      this.recommendedIngredients = this.ingredients.filter(
        (ingredients) =>
          ingredients.nom?.toLowerCase().startsWith(filterValue) &&
          !this.filteredIngredients.includes(ingredients)
      );
    } else {
      // If the search query is empty, show all categories
      this.filteredIngredients = [...this.ingredients];
    }
  }

  getAuthenticatedUser() {
    let id = Number(localStorage.getItem('idAuth'));
    this.personneService.showOnePerson(id).subscribe(
      (data) => {
        this.authUser = {
          nomComplet: data.nomComplet,
          user_name: data.user_name,
          adresseMail: data.adresseMail,
          role: data.role,
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
