import { PersonneService } from './../services/personne.service';
import { AuthService } from './../services/auth.service';
import { HeaderComponent } from './../header/header.component';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette';
import { Categorie } from '../models/categorie';
import { CategorieService } from '../services/categorie.service';
import { Personne } from '../models/personne';


@Component({
  selector: 'app-list-recette',
  templateUrl: './list-recette.component.html',
  styleUrls: ['./list-recette.component.css']
})
export class ListRecetteComponent implements OnInit {
  recettes: Recette[] = [];
  categories: Categorie[] = [];
  authUser: Personne = {};
  filteredRecettes: Recette[] = []; // Replace 'any' with the actual type of your categories
  selectedRecettes: any; // Replace 'any' with the actual type of your category
  recommendedRecettes: Recette[] = [];

  constructor(private recetteService: RecetteService,private route: ActivatedRoute, private router: Router,private categorieService: CategorieService, private personneService: PersonneService) { }

  ngOnInit(): void {
    // Check if the URL contains an 'id' parameter
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      // If the 'id' parameter exists, display recipes by category
      this.fetchRecettesByCategory(id);
    } else {
      // If the 'id' parameter does not exist, display all recipes
      this.fetchRecettes();
    }

    this.getAuthenticatedUser();
    console.log(this.authUser.role);

  }

  getAuthenticatedUser() {
    let id = Number (localStorage.getItem('idAuth'));
    this.personneService.showOnePerson(id).subscribe(
      (data) => {
        this.authUser = {
          nomComplet : data.nomComplet,
          user_name : data.user_name,
          adresseMail : data.adresseMail,
          role : data.role
        }
      },
      (error) => {
        console.log(error);

      }
    );

  }

  fetchRecettes(): void {
    this.recetteService.getRecettes().subscribe(
      (data:any) => {
        this.recettes = data;
        this.filteredRecettes = [...this.recettes];
      },
      error => {
        console.log(error);
      }
    );
  }

  fetchRecettesByCategory(categorie_id: number): void {
    this.recetteService.recettesByCategorie(categorie_id).subscribe(
      (data: any) => {
        this.recettes = data;
      },
      error => {
        console.log('Une erreur s\'est produite lors du chargement des recettes : ', error);
      }
    );
  }
  viewRecette(id: number | undefined): void {
    this.router.navigate(['/recette', id]);
  }
  addRecette(): void{
    this.router.navigate(['recettes/add']);
  }
  updateRecette(id: number): void {
    this.router.navigate(['recettes/update',id]);
  }
  deleteRecette(id: number): void {
    if (confirm('Are you sure you want to delete this recette?')) {
      this.recetteService.deleteRecette(id).subscribe(
        () => {
          this.fetchRecettes();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  filterRecipes() {
    if (this.selectedRecettes) {
      // If a search query is entered, filter the categories based on it
      const filterValue = this.selectedRecettes.toLowerCase();
      this.filteredRecettes = this.recettes.filter((recettes) =>
        recettes.nom?.toLowerCase().includes(filterValue)
      );
      // Generate recommended categories based on the filter value
      this.recommendedRecettes = this.recettes.filter(
        (recettes) =>
        recettes.nom?.toLowerCase().startsWith(filterValue) &&
          !this.filteredRecettes.includes(recettes)
      );
    } else {
      // If the search query is empty, show all categories
      this.filteredRecettes = [...this.recettes];
    }
  }

}
