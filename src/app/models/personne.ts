import { Commentaire } from "./commentaire";
import { Media } from "./media";
import { Profil } from "./profil";
import { Recette } from "./recette";

export class Personne {
  id?:number
  adresseMail?:string;
  motDePasse?:string;
  nomComplet?:string;
  statut?:string;
  user_name?:string;
  image?: string;
  dateCreation?:string;
  role?: string;
  abonnees?:Personne[];
  mesRecettes?:Recette[];
  recettesApprouvees?:Recette[];
  images?:Media[];
  commentaires?:Commentaire[];
  remarques?:Commentaire[];

}
