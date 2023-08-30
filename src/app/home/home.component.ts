import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router,private categorieService: CategorieService, private recetteService:RecetteService) { }
  addRecette(): void{
    this.router.navigate(['recettes/add']);
  }
  categories: Categorie[] = [];
  recettes:Recette[]=[];
  ngOnInit() {
    this.loadCategories();
    this.loadRecettes();
  }

  loadCategories() {

    this.categorieService.getCategories().subscribe(
      (data: any) => {

        this.categories = data.slice(0,5);console.log(this.categories)
      },
      error => {
        console.log('Une erreur s\'est produite lors du chargement des catégories : ', error);
      }
    );
  }
  viewRecetteBycategory(id: number | undefined): void {
    this.router.navigate(['/recettes_Category',id]);
  }
  viewRecette(id: number | undefined): void {
    this.router.navigate(['/recette', id]);
  }
  loadRecettes(){
    this.recetteService.getRecettes().subscribe(
      (data: any) => {

        this.recettes = data.slice(0,3);console.log(this.recettes)
      },
      error => {
        console.log('Une erreur s\'est produite lors du chargement des catégories : ', error);
      }
    );
  }

}
