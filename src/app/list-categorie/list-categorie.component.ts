import { Recette } from './../models/recette';
import { Categorie } from './../models/categorie';
import { Component , OnInit} from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { ActivatedRoute,Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent implements OnInit {
  categories: Categorie[] = [];
  recette: Recette[]=[]
  filteredCategories:Categorie[] = []; // Replace 'any' with the actual type of your categories
  selectedCategory: any; // Replace 'any' with the actual type of your category
  recommendedCategories:Categorie[] = [];


  constructor(private route: ActivatedRoute,private recetteService: RecetteService,private router: Router,private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.fetchCatgorie();


  }

  // loadCategories() {

  //   this.categorieService.getCategories().subscribe(
  //     (data: any) => {

  //       this.categories = data;
  //       console.log(this.categories)
  //     },
  //     error => {
  //       console.log('Une erreur s\'est produite lors du chargement des catégories : ', error);
  //     }
  //   );
  // }
  filterCategories() {
    if (this.selectedCategory) {
      // If a search query is entered, filter the categories based on it
      const filterValue = this.selectedCategory.toLowerCase();
      this.filteredCategories = this.categories.filter(
        (categories) => categories.nomCat?.toLowerCase().includes(filterValue)
      );
      // Generate recommended categories based on the filter value
    this.recommendedCategories = this.categories.filter(
      (categories) => categories.nomCat?.toLowerCase().startsWith(filterValue) && !this.filteredCategories.includes(categories)
    );
    } else {
      // If the search query is empty, show all categories
      this.filteredCategories = [...this.categories];
    }
  }
  selectRecommendedCategory(category: Categorie) {
    this.selectedCategory = category.nomCat;
    this.filterCategories();
  }


  afficherRecettebycategorie(categorie_id: number| undefined): void {
    this.recetteService.recettesByCategorie(categorie_id).subscribe(
      (data:any) => {
        this.recette = data;
        console.log(data);
        // Navigate to the RecettesComponent with the selected category ID
        this.router.navigate(['', categorie_id]);
      },
      error => {
        console.log('Une erreur s\'est produite lors du chargement des recettes : ', error);
      }
    );
  }
  viewRecetteBycategory(id: number | undefined): void {
    this.router.navigate(['/recettes', id]);
  }
  fetchCatgorie(): void {
    this.categorieService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories)
      this.filteredCategories = [...this.categories]; // Initialize the filtered list with all categories
    },
    error => {
      console.log('Une erreur s\'est produite lors du chargement des catégories : ', error);
    }
   );


  }
  deleteCategorie(id: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this category?');
    if (confirmation) {
      this.categorieService.deleteCategorie(id).subscribe(
        () => {
          this.router.navigate(['/categories']);
        },
        error => {
          console.log(error);
        }
      );
    }
    else{
      this.router.navigate(['/categories']);

    }
  }
  updateCategorie(id: number): void {
    this.router.navigate(['categories/update',id]);
  }
}
