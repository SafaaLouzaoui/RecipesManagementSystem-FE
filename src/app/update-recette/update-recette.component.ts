import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { MotCleService } from './../services/mot-cle.service';
import { Besoin } from './../models/besoin';
import { MotCle } from './../models/mot-cle';
import { Categorie } from './../models/categorie';
import { Quantite } from './../models/quantite';
import { Etape } from './../models/etape';
import { Ingredient } from './../models/ingredient';
import { Personne } from './../models/personne';
import { Recette } from '../models/recette';
import { CategorieService } from '../services/categorie.service';
import { IngredientService } from '../services/ingredient.service';
import { MediaType } from '../models/media-type';

interface Media {
  id?:number;
  url?:string;
  personne?:Personne;
  mediaType?:MediaType;
  besoins?:Besoin[];
  etape?:Etape;
  recette?:Recette;
  file?: File; // We'll store the actual file here
}
@Component({
  selector: 'app-update-recette',
  templateUrl: './update-recette.component.html',
  styleUrls: ['./update-recette.component.css']
})
export class UpdateRecetteComponent implements OnInit {
  recette: any; // Define the recette object to hold the updated values
  id!: number;

  categoriess: any;
  ingrediantss: any;
  motCless: any;

  errorMedia: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService,
    private router: Router,
    private ingredient: IngredientService,
    private categorie: CategorieService,
    private motCle: MotCleService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getRecette();
    this.getCategories();
    this.getIngredient();
    this.getMotCles();

  }

  getRecette(): void {
    this.recetteService.getRecetteById(this.id).subscribe(
      data => {
        this.recette = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateRecette(): void {
    this.recetteService.updateRecette(this.id,this.recette).subscribe(
      () => {
        console.log('Recette updated successfully.');
        alert('Recette updated successfully');
        this.router.navigate(['recettes']);
      },
      error => {
        console.log(error);
        alert('Error updating recette');
      }
    );
  }

  // show Categories
  getCategories() {
    this.categorie.getCategories().subscribe(
      (data2) => {
        console.log(data2);
        this.categoriess = data2;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //show ingrediants
  getIngredient() {
    this.ingredient.getIngredients().subscribe(
      (data1) => {
        console.log(data1);
        this.ingrediantss = data1;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //show mot cles
  getMotCles() {
    this.motCle.getMotCles().subscribe(
      (data1) => {
        console.log(data1);
        this.motCless = data1;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addIngredient(): void {
    const newIngredient: Ingredient = new Ingredient();
    this.recette.ingredients.push(newIngredient);

    const newQuantite: Quantite = {};
    this.recette.quantites.push(newQuantite);
  }

  removeIngredient(index: number): void {
    this.recette.ingredients.splice(index, 1);
    this.recette.quantites.splice(index, 1);
  }

  addCategorie(): void {
    const newCategorie: Categorie = new Categorie();
    this.recette.categories.push(newCategorie);
  }

  removeCategorie(index: number): void {
    this.recette.categories.splice(index, 1);
  }

  addEtape(): void {
    const newStep: Etape = {};
    this.recette.etapes.push(newStep);
  }

  removeEtape(index: number): void {
    this.recette.etapes.splice(index, 1);
  }

  addBesoin(): void {
    const newNeed: Besoin = {};
    this.recette.besoins.push(newNeed);
  }

  removeBesoin(index: number): void {
    this.recette.besoins.splice(index, 1);
  }

  addMotCle(): void {
    const newMotCle: MotCle = new MotCle();
    this.recette.motCles.push(newMotCle);
  }

  removeMotCle(index: number): void {
    this.recette.motCles.splice(index, 1);
  }

  onMediaFileSelected(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64Url = reader.result as string;
        const maxTextSize = 65535;

        if (base64Url.length > maxTextSize) {
          this.errorMedia[index] = 'Image URL size exceeds the maximum allowed limit for TEXT type.'
          return;
        } else {
          this.errorMedia[index] = '';
        }

        this.recette.medias[index] = {
          url: base64Url,
          file: file,

        };
      };
    }
  }

  onMediaFileUpdated(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      // Read the file as a Data URL (Base64)
      reader.readAsDataURL(file);

      // Once the file is read, update the URL and file in the media object
      reader.onload = () => {
        // Assuming that `this.recette.medias` is an array of media objects
        if (index >= 0 && index < this.recette.medias.length) {
          this.recette.medias[index] = {
            url: reader.result as string,
            file: file
          };
        } else {
          // Handle the case where the specified index is out of bounds
          console.error("Invalid index for updating media.");
        }
      };
    }
  }

  addMedia(): void {
    const newMedia: Media = {};
    this.recette.medias.push(newMedia);
    console.log(this.recette.medias);
  }

  removeMedia(index: number) :void {
    this.recette.medias.splice(index, 1);
    this.errorMedia.splice(index, 1);
  }

  cancel(): void {
    this.router.navigate(['/recettes']);
  }

   //Animating and styles --->
   onAddButtonClick(): void {
    // Add a class to the button when clicked to trigger the animation
    const addButton = document.querySelector('.addButt');
    if (addButton) {
      addButton.classList.add('clicked');

      // Remove the class after a short delay to reset the animation
      setTimeout(() => {
        addButton.classList.remove('clicked');
      }, 300); // Change this value to adjust the duration of the animation
    }
  }

}

