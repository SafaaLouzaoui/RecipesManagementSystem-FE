import { IngredientService } from './../services/ingredient.service';
import { Component } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from '../models/ingredient';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent {
  name: string='';
  description: string='';
  itemImage: string='';
  ingredient: Ingredient = {} ;
  isUpdateMode: boolean = false; // Variable to track the mode (add or update)
  id!:number;


  constructor(private IngredientService: IngredientService,private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    // Check if there's an ID in the URL to determine the mode
   this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isUpdateMode = !!this.id; // Convert the ID to a boolean (true if ID exists, false if not)
    console.log(this.id)
    this.getIngredient();
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
      this.updateIngredient();
    } else {
      // Perform add logic here
      this.AddIngredient();

    }
  }
  AddIngredient():void{
    const Ingredient: Ingredient = {
      nom: this.ingredient.nom,
      description: this.ingredient.description,
      media: this.itemImage
    };
    this.IngredientService.createIngredient(Ingredient).subscribe(
      () => {
        console.log('Catégorie ajoutée avec succès');
        this.router.navigate(['ingredients']);

      },
      error => {
        console.error('Erreur lors de l\'ajout de la catégorie', error);
      }
    );
  }
  updateIngredient(): void {
    const Ingredient: Ingredient = {
      nom: this.ingredient.nom,
      description: this.ingredient.description,
      media: this.itemImage
    };
    this.IngredientService.updateIngredient(this.id,Ingredient).subscribe(
      () => {
        console.log('category updated successfully.');
        this.router.navigate(['ingredients']);
        console.log(Ingredient)

      },
      error => {
        console.log(error);
      }

    );
  }
  getIngredient(): void {
    this.IngredientService.getIngredientById(this.id).subscribe(
      (data: any) => {
        this.ingredient = data;
    },
    error => {
      console.log('Une erreur s\'est produite lors du chargement des catégories : ', error);
    }
   );

  }
}
