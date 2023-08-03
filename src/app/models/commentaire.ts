import { Personne } from "./personne";
import { Recette } from "./recette";

export class Commentaire {

    id?:number;
    message?:number;
    note?:number;
    createurRecette?:Personne;
    recette?: Recette;
    ApprobateurRecette?:Commentaire;
    proprietaire?:Personne;
}
