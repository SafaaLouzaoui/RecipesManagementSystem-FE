import { Categorie } from './../models/categorie';
import { Component } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent {
  itemName: string = '';
  itemDescription: string = '';
  itemImage: string='';
  itemImage1:string='';
  categorie: Categorie = {} ;
  isUpdateMode: boolean = false; // Variable to track the mode (add or update)
  id!:number;


  constructor(private categorieService: CategorieService,private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    // Check if there's an ID in the URL to determine the mode
   this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isUpdateMode = !!this.id; // Convert the ID to a boolean (true if ID exists, false if not)
    console.log(this.id)
    this.fetchCatgorie();
  }

  extractFileName(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.itemImage = files[0].name;
    }
  }
  onSubmit(): void {
    if (this.isUpdateMode ) {
      // Perform update logic here
      this.updateCategorie();
    } else {
      // Perform add logic here
      this.AddCategorie();

    }
  }
  AddCategorie():void{
    const categorie: Categorie = {
      nomCat: this.categorie.nomCat,
      descriptionCat: this.categorie.descriptionCat,
      media: this.itemImage
    };
    this.categorieService.createCategorie(categorie).subscribe(
      () => {
        console.log('Catégorie ajoutée avec succès');
        this.router.navigate(['categories']);

      },
      error => {
        console.error('Erreur lors de l\'ajout de la catégorie', error);
      }
    );
  }
  updateCategorie(): void {
    const categorie: Categorie = {
      nomCat: this.categorie.nomCat,
      descriptionCat: this.categorie.descriptionCat,
      media: this.itemImage
    };
    this.categorieService.updateCategorie(this.id,categorie).subscribe(
      () => {
        console.log('category updated successfully.');
        this.router.navigate(['/categories']);
        console.log(categorie)

      },
      error => {
        console.log(error);
      }

    );
  }
  fetchCatgorie(): void {
    this.categorieService.getCategoryById(this.id).subscribe(
      (data: any) => {
        this.categorie = data;
    },
    error => {
      console.log('Une erreur s\'est produite lors du chargement des catégories : ', error);
    }
   );


}
}
