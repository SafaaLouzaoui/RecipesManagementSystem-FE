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
  username?:string;
  image?: string;
  dateCreation?:string;
  profile?:Profil;
  abonnees?:Personne[];
  mesRecettes?:Recette[];
  recettesApprouvees?:Recette[];
  images?:Media[];
  commentaires?:Commentaire[];
  remarques?:Commentaire[];

}
