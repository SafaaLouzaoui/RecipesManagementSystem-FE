import { Besoin } from './besoin';
import { Etape } from './etape';
import { MediaType } from './media-type';
import { Personne } from './personne';
import { Recette } from './recette';

export class Media {
  id?: number;
  url?: string;
  personne?: Personne;
  mediaType?: MediaType;
  besoins?: Besoin[];
  etape?: Etape;
  recette?: Recette;
  file?: File; // We'll store the actual file here
}
