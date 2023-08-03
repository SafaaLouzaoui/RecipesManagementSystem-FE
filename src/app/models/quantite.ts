import { Ingredient } from "./ingredient";
import { Recette } from "./recette";

export class Quantite {
    id?: number;
    uniteDeMesure?:string;
    nombre?:number;

    ingredient?:Ingredient;
    recette?:Recette;
}
