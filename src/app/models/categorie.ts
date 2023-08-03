import { Personne } from "./personne";
import { Recette } from "./recette";


export class Categorie {

    idCat?:number;
    descriptionCat?:string;
    nomCat ?:string;
    media?:string;
    recettes?:Recette[];
    categories?:Categorie[];



}
