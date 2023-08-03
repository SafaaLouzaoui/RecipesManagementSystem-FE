import { Ingredient } from "./ingredient";
import { Etape } from "./etape";
import { Personne } from "./personne";
import { Media } from "./media";
import { MotCle } from "./mot-cle";
import { Besoin } from "./besoin";
import { Categorie } from "./categorie";
import { TypeRelation } from "./type-relation";
import { Quantite } from "./quantite";
import { Commentaire } from "./commentaire";

export class Recette {
    id?: number;
    nom ?: string;
    description?: string;
    origine?: string;
    dureePreparation ?: number;
    dureeCuisson ?: number;
    nbrPersonnes?: number
    visibilitee?: string;
    statut?: number;
    dateSoumission?: Date;
    datePublication?: Date;
  ingredients?: Ingredient[];
  etapes?: Etape[];
  idCreateur?:number;

  utilisateurCreateur ?:Personne;
  utilisateurApprobateur ?:Personne;
  signalants?:Personne[];
  medias?:Media[];
  besoins?:Besoin[];

  motCles?:MotCle[];
  categories?:Categorie[];
  quantites?:Quantite[];
  commentaires?:Commentaire[];
  typeRelation?:TypeRelation;
  typeRel?:TypeRelation;
  recettes?:Recette[];


}
