import { Injectable ,ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainContentService {

  constructor() { }
  mainContentRef: ElementRef | null = null;

}
