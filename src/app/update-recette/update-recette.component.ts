import { MotCleService } from './../services/mot-cle.service';
import { MotCle } from './../models/mot-cle';
import { Categorie } from './../models/categorie';
import { Quantite } from './../models/quantite';
import { Ingredient } from './../models/ingredient';
import { Personne } from './../models/personne';
import { Media } from './../models/media';
import { Etape } from './../models/etape';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette';
import { CategorieService } from '../services/categorie.service';
import { IngredientService } from '../services/ingredient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-recette',
  templateUrl: './update-recette.component.html',
  styleUrls: ['./update-recette.component.css'],
})
export class UpdateRecetteComponent implements OnInit {
  myForm!: FormGroup;
  // Properties to hold form data
  recette: any;
  id?: number;

  categoriess: any;
  ingrediantss: any;
  motCless: any;

  //Variables of validation
  errorEtape: string[] = [];
  errorQuantiteIngredient: string = '';
  errorMedia: string[] = [];

  messageMedia: string[] = [];
  messageEtape: string[] = [];

  errorMessages: { [key: string]: string } = {
    nom: '',
    description: '',
    origine: '',
    dureePreparation: '',
    dureeCuisson: '',
    nbrPersonnes: '',
    utilisateurCreateur: '',
    ingredients: '',
    quantites: '',
    etapes: '',
    medias: '',
  };

  constructor(
    private recetteService: RecetteService,
    private router: Router,
    private route: ActivatedRoute,
    private ingredient: IngredientService,
    private categorie: CategorieService,
    private motCle: MotCleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getRecette();
    console.log(this.recette);
    this.getCategories();
    this.getIngredient();
    this.getMotCles();

    this.myForm = this.formBuilder.group({
      nom: ['', Validators.required], // Apply required validator to ensure the field is not empty
      // description: ['', Validators.required],
      // dureePreparation: [0, Validators.required], // Apply min validator to ensure the number is non-negative
      // nbrPersonnes: [1, Validators.min(1)], // Apply min validator to ensure the number is at least 1
      // medias: this.formBuilder.array([]),
    });
  }
  getRecette(): void {
    if (this.id != undefined) {
      this.recetteService.getRecetteById(this.id).subscribe(
        (data) => {
          this.recette = data;
        },
        (error) => {
          console.log(error);
          this.router.navigate(['/recettes']);
        }
      );
    }
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
  UpdateRecette(): void {
    let valid: boolean = true;

    // Validate attributes
    if (!this.recette.nom) {
      this.errorMessages['nom'] = 'Recipe name is required.';
      valid = false;
    } else this.clearErrorMessages(0);
    if (!this.recette.description) {
      this.errorMessages['description'] = 'Description is required.';
      valid = false;
    } else this.clearErrorMessages(1);
    if (!this.recette.origine) {
      this.errorMessages['origine'] = 'Origin is required.';
      valid = false;
    } else this.clearErrorMessages(2);
    if (this.recette.dureePreparation === undefined) {
      this.errorMessages['dureePreparation'] =
        'Preparation duration is required.';
      valid = false;
    } else this.clearErrorMessages(3);
    if (this.recette.dureeCuisson === undefined) {
      this.errorMessages['dureeCuisson'] = 'Cooking duration is required.';
      valid = false;
    } else this.clearErrorMessages(4);
    if (this.recette.nbrPersonnes === undefined) {
      this.errorMessages['nbrPersonnes'] = 'Number of persons is required.';
      valid = false;
    } else this.clearErrorMessages(5);
    if (this.recette.ingredients.length === 0) {
      this.errorMessages['ingredients'] =
        'At least one ingrediant is required.';
      valid = false;
    } else this.clearErrorMessages(6);
    if (this.recette.quantites.length === 0) {
      this.errorMessages['quantites'] = 'At least one quantity is required.';
      valid = false;
    } else this.clearErrorMessages(7);
    for (let ing of this.recette.ingredients) {
      if (ing.nom === undefined) {
        this.errorMessages['ingredients'] = "Ingredients can't be empty.";
        valid = false;
        break;
      } else this.clearErrorMessages(6);
    }
    for (let quan of this.recette.quantites) {
      if (quan.nombre === undefined || quan.uniteDeMesure === undefined) {
        this.errorMessages['quantites'] = 'Qantity is invalid.';
        valid = false;
        break;
      } else this.clearErrorMessages(7);
    }
    if (this.recette.etapes.length === 0) {
      this.errorMessages['etapes'] = 'At least one step is required.';
      valid = false;
    } else this.clearErrorMessages(8);
    for (let etape of this.recette.etapes) {
      if (etape.description === undefined || etape.duree === undefined) {
        this.errorMessages['etapes'] = 'Steps are invalid.';
        valid = false;
        break;
      } else this.clearErrorMessages(8);
    }
    if (this.recette.medias.length === 0) {
      this.errorMessages['medias'] = 'At least one media is required.';
      valid = false;
    } else this.clearErrorMessages(9);
    for (let med of this.recette.medias) {
      if (med.url === undefined) {
        this.errorMessages['medias'] = "Medias can't be empty.";
        valid = false;
        break;
      } else this.clearErrorMessages(9);
    }
    if (this.recette.categories.length === 0) {
      this.errorMessages['categories'] = 'At least one categorie is required.';
      valid = false;
    } else this.clearErrorMessages(10);
    for (let cat of this.recette.categories) {
      if (cat.nomCat === undefined) {
        this.errorMessages['categories'] = "Categories can't be empty.";
        valid = false;
        break;
      } else this.clearErrorMessages(10);
    }
    console.log(this.errorMessages);

    if (valid) {
      this.recetteService
        .updateMesRecette(this.recette.id, this.recette)
        .subscribe(
          () => {
            console.log('Recette updated successfully.');
            alert('Recette updated successfully');
            this.router.navigate(['recettes']);
          },
          (error) => {
            console.log(error);
            alert('Error updating recette');
          }
        );
    } else {
      alert('ERROR IN UPDATING');
    }
  }

  clearErrorMessages(index: number): void {
    switch (index) {
      case 0:
        this.errorMessages['nom'] = '';
        break;
      case 1:
        this.errorMessages['origine'] = '';
        break;
      case 2:
        this.errorMessages['description'] = '';
        break;
      case 3:
        this.errorMessages['dureePreparation'] = '';
        break;
      case 4:
        this.errorMessages['dureeCuisson'] = '';
        break;
      case 5:
        this.errorMessages['nbrPersonnes'] = '';
        break;
      case 6:
        this.errorMessages['ingredients'] = '';
        break;
      case 7:
        this.errorMessages['quantites'] = '';
        break;
      case 8:
        this.errorMessages['etapes'] = '';
        break;
      case 9:
        this.errorMessages['medias'] = '';
        break;
      case 10:
        this.errorMessages['categories'] = '';
        break;
    }
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
  handleInputIng(index: number) {
    const IngredientInput = this.recette.ingredients[index].nom;
    const matchedIngredient = this.ingrediantss.find(
      (ing: { nom: string | undefined }) => ing.nom === IngredientInput
    );

    if (matchedIngredient) {
      this.recette.ingredients[index] = matchedIngredient;
    }
  }
  getSuggestedIngredients(input: any): Ingredient[] {
    return this.ingrediantss.filter((ing: { nom: string }) =>
      ing.nom.toLowerCase().includes(input.toLowerCase())
    );
  }

  addCategorie(): void {
    const newCategorie: Categorie = new Categorie();
    this.recette.categories.push(newCategorie);
  }

  removeCategorie(index: number): void {
    this.recette.categories.splice(index, 1);
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
          this.errorEtape[index] = 'Image size is too big.';
          this.messageEtape[index] = '';
          return;
        } else {
          this.errorEtape[index] = '';
          this.messageEtape[index] = '';
        }

        // If the URL is within the limit, store the URL and file in the media object
        this.recette.etapes[index] = {
          media: base64Url,
          file: file,
          description: this.recette.etapes[index].description,
          duree: this.recette.etapes[index].duree,
        };
      };
    }
  }

  addEtape(): void {
    const newStep: Etape = {};
    this.recette.etapes.push(newStep);
    this.messageEtape.push('Upload image (Optional)');
  }

  removeEtape(index: number): void {
    this.recette.etapes.splice(index, 1);
    this.errorEtape.splice(index, 1);
    this.messageEtape.splice(index, 1);
  }

  addMotCle(): void {
    const newMotCle: MotCle = new MotCle();
    this.recette.motCles.push(newMotCle);
    console.log(this.recette.motCles);
  }

  removeMotCle(index: number): void {
    this.recette.motCles.splice(index, 1);
  }
  //handleInput method to ensure if the input was selected from the datalist or was entered by the user
  handleInput(index: number) {
    const motCleInput = this.recette.motCles[index].mot;
    const matchedMotCle = this.motCless.find(
      (mc: { mot: string | undefined }) => mc.mot === motCleInput
    );

    if (matchedMotCle) {
      this.recette.motCles[index] = matchedMotCle;
    }
  }

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
          this.errorMedia[index] = 'Image is too big.';
          this.messageMedia[index] = '';
          return;
        } else {
          this.errorMedia[index] = '';
          this.messageMedia[index] = '';
        }

        // If the URL is within the limit, store the URL and file in the media object
        this.recette.medias[index] = {
          url: base64Url,
          file: file,
        };
      };
    }
  }

  addMedia(): void {
    const newMedia: Media = {};
    this.recette.medias.push(newMedia);
    this.messageMedia.push('Upload Image');
  }

  removeMedia(index: number): void {
    this.recette.medias.splice(index, 1);
    this.errorMedia.splice(index, 1);
    this.messageMedia.splice(index, 1);
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
