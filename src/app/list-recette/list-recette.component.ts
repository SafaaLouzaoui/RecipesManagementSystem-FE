import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette';
import { Categorie } from '../models/categorie';
import { CategorieService } from '../services/categorie.service';


@Component({
  selector: 'app-list-recette',
  templateUrl: './list-recette.component.html',
  styleUrls: ['./list-recette.component.css']
})
export class ListRecetteComponent implements OnInit {
  recettes: Recette[] = [];
  categories: Categorie[] = [];
  currentUrl= '';

  constructor(private recetteService: RecetteService,private route: ActivatedRoute, private router: Router,private categorieService: CategorieService) { }

  ngOnInit(): void {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update the currentUrl variable with the current URL
        this.currentUrl = event.url;
      }
    });
    // Check if the URL contains an 'id' parameter
    if (this.currentUrl.includes('recettes_Category')) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
      // If the 'id' parameter exists, display recipes by category
      this.fetchRecettesByCategory(id);
    }
    if(this.currentUrl.includes('recettes_User')){
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.fetchRecettesByUser(id);
    }
    else {
      // If the 'id' parameter does not exist, display all recipes
      this.fetchRecettes();
    }
  }

  fetchRecettes(): void {
    this.recetteService.getRecettes().subscribe(
      (data:any) => {
        this.recettes = data;
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

  fetchRecettesByUser(id: number): void {
    this.recetteService.getMesRecette(id).subscribe(
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


}
