import { Media } from "./media";
import { Recette } from "./recette";


export class Etape {

    id?:number;
    description?:string;
    duree?:number;
    ordre?:number;
    recette?:Recette;
    medias?:Media[];
}
