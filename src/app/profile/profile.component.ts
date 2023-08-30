import { Commentaire } from './../models/commentaire';
import { PersonneService } from './../services/personne.service';
import { Personne } from './../models/personne';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette';
import { AuthService } from './../services/auth.service';




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
    private location: Location,private recetteService: RecetteService,private authService: AuthService,
    private personService:PersonneService) { }
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
  allUsers:Personne[]=[];
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
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("////////////////////////////");
    console.log(this.id);
    this.fetchPersonne();
    this.fetchRecettesByUser();
    this.listCommetaires();
    this.fetchAllUsers();
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
    this.personService.showOnePerson(this.id).subscribe(
      (data: any) => {
        this.personne = data;
        console.log("///////////////////personnne////////////")
        console.log(this.personne);
    },
    error => {
      console.log('Une erreur s\'est produite lors du chargement des catégories : ', error);
    }
   );
  }

  fetchAllUsers(): void {
    console.log("testtesttesttettfhsdbfjk")
        console.log(this.allUsers);
    this.personService.getAllPersons().subscribe(
      (data:any) => {
        this.allUsers = data;

      },
      error => {
        console.log(error);
      }
    );
  }
  updatePersonne(): void {
    const personne: Personne = {
      role:this.personne.role
    };
    this.PersonneService.updateUser(this.personne.id,personne).subscribe(
      () => {
        console.log(' updated successfully.');

      },
      error => {
        console.log(error);
      }

    );
  }

  fetchRecettesByUser(): void {

    this.recetteService.getMesRecette(this.id).subscribe(
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
  comment_recette(id: number): void {
    this.router.navigate(['recettes',id]);
  }
  deleteRecette(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.recetteService.deleteRecette(id).subscribe(
        () => {
          this.refreshPage();
         },
        error => {
          console.log(error);
        }
      );
    }
  }

  deletePersonne(id: number): void {
    if (confirm('Are you sure you want to delete this recette?')) {
      this.personService.deleteUser(id).subscribe(
        () => {

        },
        error => {
          console.log(error);
        }
      );
    }
  }
  logout() {
    this.authService.logout().subscribe(
      (data) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Logout error : '+error);
      }
    );
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


  refreshPage() {
    // Reload the current page to display the updated comments
    window.location.reload();
  }


  listCommetaires() {
    this.recetteService.getMesRecette(this.id).subscribe(
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
        console.log("//////////COMMENTS////////////////")
        console.log(this.mesComments);
      },
      (error) => {
        console.error('Error fetching recettes:', error);
      }
    );
}
}
