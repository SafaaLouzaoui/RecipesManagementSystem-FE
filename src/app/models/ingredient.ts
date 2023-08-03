import { Quantite } from "./quantite";
import { Recette } from "./recette";

export class Ingredient {
    id?: number;
    nom?: string;
    description?: string;
    media?:string;
    ingredientReference?:Ingredient;
    quantites?:Quantite[];
    recettes?:Recette[];

}
