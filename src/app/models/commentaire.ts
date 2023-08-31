import { Timestamp } from "rxjs";
import { Personne } from "./personne";
import { Recette } from "./recette";

export class Commentaire {

    id?:number;
    message?:string;
    note?:number;
    createurRecette?:Personne;
    recetteID?: number;
    ApprobateurRecette?:Commentaire;
    proprietaire?:Personne;
    createdAt?: Date;
    created_at_diff?: string;
}
