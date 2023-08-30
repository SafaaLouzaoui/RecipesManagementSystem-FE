import { Commentaire } from './../models/commentaire';
import { PersonneService } from './../services/personne.service';
import { Personne } from './../models/personne';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette';



interface Notification {
  message: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private elementRef: ElementRef,private route: ActivatedRoute,
    private router: Router,private PersonneService:PersonneService,
    private location: Location,private recetteService: RecetteService,private personService:PersonneService) { }
  showProfile: boolean = false;
  showRecipe: boolean = true;
  showAddRecipe: boolean = false;
  ShowAllUsers: boolean=false
  ShowInfoUser:boolean=false;
  showCategories:boolean=false;
  showIngredients:boolean=false;

  Role:boolean=false;

  selectedOption=1;
  recettes: Recette[] = [];

  isOpen: boolean = false;
  notifications: Notification[] = [
    { message: 'New message received' },
    { message: 'Task completed' },
    { message: 'Reminder: Meeting at 3 PM' }
  ];

  Name: string = '';
  username: string = '';
  email: string='';
  personne:Personne={};
  id!:number;

  mesComments?: Commentaire[]=[];
  mesRecettes?: Recette[]=[];

  ngOnInit(): void {
    const menuIcon = this.elementRef.nativeElement.querySelector('.menuicn');
    const nav = this.elementRef.nativeElement.querySelector('.navcontainer');
    menuIcon.addEventListener('click', () => {
      nav.classList.toggle('navclose');
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchPersonne();
    });
    this.fetchPersonne();
    this.fetchRecettesByUser();

  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  fetchCatgorie(): void {
    this.PersonneService.showOnePerson().subscribe(
      (data: any) => {
        this.personne = data;
         // Initialize the filtered list with all categories
    },
    error => {
      console.log('Une erreur s\'est produite lors du chargement des catégories : ', error);
    }
   );


  }
  fetchPersonne(): void {
    this.personService.showOnePerson(25).subscribe(
      (data: any) => {
        this.personne = data;
        console.log(this.personne);
    },
    error => {
      console.log('Une erreur s\'est produite lors du chargement des catégories : ', error);
    }
   );
  }

  fetchRecettesByUser(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    const id=25;
    this.recetteService.getMesRecette(id).subscribe(
      (data: any) => {
        this.recettes = data;
      },
      error => {
        console.log('Une erreur s\'est produite lors du chargement des recettes : ', error);
      }
    );
  }
  viewRecette(id: number | undefined): void {
    this.router.navigate(['/recette', id]);
  }
  addRecette(): void{
    this.router.navigate(['recettes/add']);
  }
  updateRecette(id: number): void {
    this.router.navigate(['recettes/update',id]);
  }
  deleteRecette(id: number): void {
    if (confirm('Are you sure you want to delete this recette?')) {
      this.recetteService.deleteRecette(id).subscribe(
        () => {
          this.fetchRecettesByUser();
        },
        error => {
          console.log(error);
        }
      );
    }
  }




  toggleProfile() {
    this.showProfile = true;
    this.showRecipe = false;
    this.showAddRecipe = false;''
    this.ShowAllUsers=false;
    this.showCategories=false;
  }

  toggleRecipe() {
    this.showProfile = false;
    this.showRecipe = true;
    this.showAddRecipe = false;
    this.ShowAllUsers=false;
    this.ShowInfoUser=false;
    this.showCategories=false;

  }

  toggleAddRecipe() {
    this.showProfile = false;
    this.showRecipe = false;
    this.showAddRecipe = true;
    this.ShowAllUsers=false;
    this.ShowInfoUser=false;
    this.showCategories=false;

  }
  toggleShowUsers() {
    this.showProfile = false;
    this.showRecipe = false;
    this.showAddRecipe = false;
    this.ShowAllUsers=true
    this.ShowInfoUser=false;
    this.showCategories=false;

  }
  toggleShowInfoUsers() {
    this.showProfile = false;
    this.showRecipe = false;
    this.showAddRecipe = false;
    this.ShowAllUsers=false
    this.ShowInfoUser=true;
    this.showCategories=false;

  }
  toggleshowCategories() {
    this.showProfile = false;
    this.showRecipe = false;
    this.showAddRecipe = false;
    this.ShowAllUsers=false;
    this.showCategories=true;

  }
  toggleshowIngredients() {
    this.showProfile = false;
    this.showRecipe = false;
    this.showAddRecipe = false;
    this.ShowAllUsers=false;
    this.showCategories=false;
    this.showIngredients=true;

  }


  selectOption(option: number): void {
    this.selectedOption = option;
  }





  listCommetaires() {
    this.recetteService.getMesRecette(25).subscribe(
      (recettes: Recette[]) => {
        this.mesRecettes = recettes; // Assign the retrieved data to the property

        // Create a set to store IDs of comments that were already displayed
        const displayedCommentIds = new Set<number>();

        for (let recette of this.mesRecettes) {
          // Use optional chaining to safely access recette.commentaires
          const comments = recette.commentaires?.filter(comment => comment.id !== undefined && !displayedCommentIds.has(comment.id));
          if (comments) {
            this.mesComments?.push(...comments);
            comments.forEach(comment => {
              if (comment.id !== undefined) {
                displayedCommentIds.add(comment.id);
              }
            });          }
        }
      },
      (error) => {
        console.error('Error fetching recettes:', error);
      }
    );
}
}
