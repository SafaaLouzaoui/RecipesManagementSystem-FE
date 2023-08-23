import { Media } from './media';
import { Recette } from './recette';

export class Etape {
  id?: number;
  description?: string;
  duree?: number;
  ordre?: number;
  recette?: Recette;
  media?: string;
  medias?: Media[];
  file?: File;
}
