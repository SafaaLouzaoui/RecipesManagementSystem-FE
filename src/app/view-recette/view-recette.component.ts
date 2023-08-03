import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette';
import { Commentaire } from '../models/commentaire';
import { HttpClient } from '@angular/common/http';
import { Media } from '../models/media';




@Component({
  selector: 'app-view-recette',
  templateUrl: './view-recette.component.html',
  styleUrls: ['./view-recette.component.css']
})
export class ViewRecetteComponent {

  recette: Recette= {} as Recette ;
  slideIndex = 1;
 //////slider
 urlMedia: Array<Media[]> = [];
 imgCollection: Array<object> = [];



  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService,
    private router: Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.getRecette();



  }

  scrollDown(){
    const detailsSection = document.querySelector('#about');
    detailsSection?.scrollIntoView({ behavior: 'smooth' });

  }


  getRecette(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recetteService.getRecetteById(id).subscribe(
      (data: Recette) => {
        this.recette = data;
        if (this.recette.medias) {
          for (const media of this.recette.medias) {
            const imageObject = {
              image: `assets/images/${media.url}`,
              thumbImage: `assets/images/${media.url}`,
              alt: 'Image 1',
              title: 'Image 1'
            };
            this.imgCollection.push(imageObject);
          }
        }
        console.log(this.imgCollection)
      },
      error => {
        console.log(error);
      }
    );
  }
//////slider

  // Commnet Recipe

commentaire : Commentaire = new Commentaire();
message :string =''
CommentRecipe(recetteId ?:number){
  let bodyData  =  {
    "message":this.message ,
    "recette":{"id":recetteId}
   };


   console.log(bodyData);


  //    this.http.post('http://localhost:8083/api/v1/commentaires/creer?idRecette='+ recetteId +'&idPersonne='+ this.userId,bodyData
  //    ).subscribe((resultData: any)=>
  // {
  //       console.log(resultData);







  //    });
}

  goBack(): void {
    this.router.navigate(['/recettes']);
  }

  getImageUrl(url: string): string {
    return `../../assets/images/${url}`;
  }





  }

