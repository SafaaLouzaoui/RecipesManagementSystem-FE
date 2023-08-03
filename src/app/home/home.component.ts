import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router,private categorieService: CategorieService) { }
  addRecette(): void{
    this.router.navigate(['recettes/add']);
  }
  categories: Categorie[] = [];

  ngOnInit() {
    this.loadCategories();
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
    this.router.navigate(['/recettes', id]);
  }

}
