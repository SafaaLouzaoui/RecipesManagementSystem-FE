import { Quantite } from './../models/quantite';
import { AuthService } from './../services/auth.service';
import { UpdateRecetteComponent } from './../update-recette/update-recette.component';
import { CommentaireService } from './../services/commentaire.service';
import { Commentaire } from './../models/commentaire';
import { Personne } from './../models/personne';
import { PersonneService } from './../services/personne.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Media } from '../models/media';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-view-recette',
  templateUrl: './view-recette.component.html',
  styleUrls: ['./view-recette.component.css'],
})

export class ViewRecetteComponent {
  recette: Recette = {};
  slideIndex = 1;
  //////slider
  urlMedia: Array<Media[]> = [];
  imgCollection: Array<object> = [];

  createurRecette?: Personne;
  commentaires?: Commentaire;
  comment: string = '';

  idAuth?: any;

  quantites: Quantite[] = [];

  follow: string = '';

  utilisateurCreateur?: Personne;

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService,
    private router: Router,
    private http: HttpClient,
    private personneService: PersonneService,
    private commentaireService: CommentaireService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.idAuth = localStorage.getItem('idAuth');
    this.getRecette();
    this.getCreateurRecette(this.recette.idCreateur);
    this.calculateTimedifference();
    console.log(this.utilisateurCreateur?.id);
    //pass utilisateurCreateur in argument
    let bol = this.mesFollowers(1);
    if(bol){
      this.follow = 'followed';
    }
  }

  scrollDown() {
    const detailsSection = document.querySelector('#about');
    detailsSection?.scrollIntoView({ behavior: 'smooth' });
  }

  getRecette(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recetteService.getRecetteById(id).subscribe(
      (data: Recette) => {
        this.recette = data;
        this.utilisateurCreateur = data.utilisateurCreateur;
        if (this.recette.medias) {
          let i = 1;
          for (const media of this.recette.medias) {
            const imageObject = {
              image: media.url,
              thumbImage: media.url,
              alt: 'Image '+i,
              title: 'Image '+i,
            };
            i++;
            this.imgCollection.push(imageObject);
          }
        }
        console.log(this.imgCollection);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.recette.commentaires);
  }
  //////slider

  // Commnet Recipe

  commentaire: Commentaire = new Commentaire();
  message: string = '';
  CommentRecipe(recetteId?: number) {
    let bodyData = {
      message: this.message,
      recette: { id: recetteId },
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

  getCreateurRecette(id: any): Observable<Personne> {
    return this.personneService.showOnePerson(id).pipe(
      map((personne: Personne) => personne),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  //Posting a comment
  postComment() {
    const newComment: Commentaire = {
      message: this.comment,
      createurRecette: this.recette?.utilisateurCreateur,
      proprietaire: { id: this.idAuth }
    };


    if (this.recette?.id !== undefined) {
      // Construct the HttpParams with both 'idRecette' and 'idPersonne' parameters
      const params = new HttpParams()
        .set('idRecette', this.recette.id.toString())
        .set('idPersonne', newComment.proprietaire?.id?.toString() || '');

      // Make the HTTP post request with the params containing both parameters
      this.commentaireService.createComment(newComment, params).subscribe(
        (response) => {
          console.log('New comment has been added successfully', response);
          alert('New comment created successfully!' + response);
          this.refreshPage();
        },
        (error) => {
          console.log('Error adding the comment', error);
          alert('Error adding the comment' + error);
        }
      );
    }
  }

  deleteComment(idComment: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this comment ?');
    if (confirmation) {
      this.commentaireService.deletComment(idComment).subscribe(
        () => {
          this.refreshPage();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  calculateTimedifference() {
    let commentsUpdatedTime: Commentaire[] = [];
    if (this.recette.commentaires != null) {
      commentsUpdatedTime = this.recette.commentaires;
      let i = 0;
      for (let comment of commentsUpdatedTime) {
        let created_at_diff = this.commentaireService.calculateTimeDifference(comment.createdAt);
        commentsUpdatedTime[i].created_at_diff = created_at_diff;
        i++;
      }
      this.recette.commentaires = commentsUpdatedTime;
    }
  }

  refreshPage() {
    // Reload the current page to display the updated comments
    window.location.reload();
  }

  followUser(id: any, idd: any) {
    if(this.follow === 'follow') {
      this.personneService.abonner(id, idd, this.recette);
      this.follow = 'followed';
    }
  }

  mesFollowers(id: any) :boolean{
    this.personneService.mesFollowers(id).subscribe(
      (data) => {
        for(let folloer of data){
          if(this.idAuth === folloer.id){
            return true;
          }
        }
        return false;
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
      return false;
  }
}
