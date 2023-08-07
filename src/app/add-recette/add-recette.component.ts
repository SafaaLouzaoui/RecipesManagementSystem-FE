import { MotCleService } from './../services/mot-cle.service';
import { Besoin } from './../models/besoin';
import { MotCle } from './../models/mot-cle';
import { Categorie } from './../models/categorie';
import { Quantite } from './../models/quantite';
import { Ingredient } from './../models/ingredient';
import { Personne } from './../models/personne';
import { booleanAttribute, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette';
import { CategorieService } from '../services/categorie.service';
import { IngredientService } from '../services/ingredient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Media {
  url?: string; // This will be the URL or Base64 Data URI of the image
  file?: File; // We'll store the actual file here
}
interface Etape {
  description?: string;
  duree?: number;
  ordre?: number;
  recetteId?: number;
  media?: string;
  file?: File;
}

@Component({
  selector: 'app-add-recette',
  templateUrl: './add-recette.component.html',
  styleUrls: ['./add-recette.component.css'],
})
export class AddRecetteComponent implements OnInit {
  myForm: FormGroup;
  // Properties to hold form data
  nom: string = '';
  description: string = '';
  origine: string = '';
  dureePreparation: number = 0;
  dureeCuisson: number = 0;
  nbrPersonnes: number = 1;
  utilisateurCreateur: Personne = { id: 9 };
  quantites: Quantite[] = [];
  ingredients: Ingredient[] = [];
  categories: Categorie[] = [];
  besoins: Besoin[] = [];
  motCles: MotCle[] = [];
  etapes: Etape[] = [];
  medias: Media[] = [];

  categoriess: any;
  ingrediantss: any;
  motCless: any;

  //Variables of validation
  errorEtape: string[] = [];
  errorQuantiteIngredient: string = '';
  errorMedia: string[] = [];



  constructor(
    private recetteService: RecetteService,
    private router: Router,
    private ingredient: IngredientService,
    private categorie: CategorieService,
    private motCle: MotCleService,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      nom: ['', Validators.required], // Apply required validator to ensure the field is not empty
      description: ['', Validators.required],
      dureePreparation: [0, Validators.required], // Apply min validator to ensure the number is non-negative
      nbrPersonnes: [1, Validators.min(1)], // Apply min validator to ensure the number is at least 1
      medias: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getIngredient();
    this.getMotCles();
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

  // Method to handle form submission
  createRecette(): void {
    this.ingredients = this.ingredients.filter(
      (element) => element !== undefined
    );
    this.quantites = this.quantites.filter((element) => element !== undefined);
    this.besoins = this.besoins.filter((element) => element !== undefined);
    this.etapes = this.etapes.filter((element) => element !== undefined);
    const formData = new FormData();
    this.medias.forEach((media) => {
      if (media.file) {
        formData.append('mediaFiles', media.file, media.file.name);
      }
    });

    let valid: boolean = true;

    if (valid) {
      const newRecetteData: Recette = {
        nom: this.nom,
        description: this.description,
        origine: this.origine,
        dureePreparation: this.dureePreparation,
        dureeCuisson: this.dureeCuisson,
        nbrPersonnes: this.nbrPersonnes,
        utilisateurCreateur: this.utilisateurCreateur,
        quantites: this.quantites,
        ingredients: this.ingredients,
        categories: this.categories,
        besoins: this.besoins,
        motCles: this.motCles,
        etapes: this.etapes,
        medias: this.medias,
      };

      this.recetteService.createRecette(newRecetteData).subscribe(
        (response) => {
          console.log('New recette created successfully!', response);
          alert('New recette created successfully!' + response);
          // Handle success, e.g., show a success message or navigate to another page
        },
        (error) => {
          console.error('Error creating recette:', error);
          alert('Error creating recette:' + error);
          // Handle error, e.g., show an error message
        }
      );
    }
  }

  addIngredient(): void {
    const newIngredient: Ingredient = new Ingredient();
    this.ingredients.push(newIngredient);

    const newQuantite: Quantite = {};
    this.quantites.push(newQuantite);
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.quantites.splice(index, 1);
  }

  addCategorie(): void {
    const newCategorie: Categorie = new Categorie();
    this.categories.push(newCategorie);
  }

  removeCategorie(index: number): void {
    this.categories.splice(index, 1);
  }

  onMediaFileSelectedEtape(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      // Read the file as a Data URL (Base64)
      reader.readAsDataURL(file);

      // Once the file is read, check the length of the Base64 URL
      reader.onload = () => {
        const base64Url = reader.result as string;
        const maxTextSize = 65535; // This is the maximum size for TEXT type in MySQL

        if (base64Url.length > maxTextSize) {
          // Display a message to the user about the size limit
          this.errorEtape[index] = 'Image URL size exceeds the maximum allowed limit for TEXT type.'
          return;
        } else {
          this.errorEtape[index] = '';
        }

        // If the URL is within the limit, store the URL and file in the media object
        this.medias[index] = {
          url: base64Url,
          file: file,
        };
      };
    }
  }

  addEtape(): void {
    const newStep: Etape = {};
    this.etapes.push(newStep);
  }

  removeEtape(index: number): void {
    this.etapes.splice(index, 1);
    this.errorEtape.splice(index, 1);
  }

  addBesoin(): void {
    const newNeed: Besoin = {};
    this.besoins.push(newNeed);
  }

  removeBesoin(index: number): void {
    this.besoins.splice(index, 1);
  }

  addMotCle(): void {
    const newMotCle: MotCle = new MotCle();
    this.motCles.push(newMotCle);
  }

  removeMotCle(index: number): void {
    this.motCles.splice(index, 1);
  }

  // onMediaFileSelected(event: Event, index: number): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const file = inputElement.files[0];
  //     const reader = new FileReader();

  //     // Read the file as a Data URL (Base64)
  //     reader.readAsDataURL(file);

  //     // Once the file is read, store the URL and file in the media object
  //     reader.onload = () => {
  //       this.medias[index] = {
  //         url: reader.result as string,
  //         file: file,
  //       };
  //     };
  //   }
  // }
  onMediaFileSelected(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();

      // Read the file as a Data URL (Base64)
      reader.readAsDataURL(file);

      // Once the file is read, check the length of the Base64 URL
      reader.onload = () => {
        const base64Url = reader.result as string;
        const maxTextSize = 65535; // This is the maximum size for TEXT type in MySQL

        if (base64Url.length > maxTextSize) {
          // Display a message to the user about the size limit
          this.errorMedia[index] = 'Image URL size exceeds the maximum allowed limit for TEXT type.'
          return;
        } else {
          this.errorMedia[index] = '';
        }

        // If the URL is within the limit, store the URL and file in the media object
        this.medias[index] = {
          url: base64Url,
          file: file,
        };
      };
    }
  }

  addMedia(): void {
    const newMedia: Media = {};
    this.medias.push(newMedia);
    console.log(this.medias);
  }

  removeMedia(index: number): void {
    this.medias.splice(index, 1);
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
