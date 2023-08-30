import { Component } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { PersonneService } from '../services/personne.service';
import { Personne } from '../models/personne';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  Name: string = '';
  username: string = '';
  email: string='';
  imageSrc: string | undefined;
  personne:Personne={};
  id!:number;

  constructor(private route: ActivatedRoute, private router: Router,
              private personService:PersonneService) {}


  ngOnInit(): void {
    // Check if there's an ID in the URL to determine the mode
   this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchPersonne();
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

  loadFile(event: any): void {
    const image = document.getElementById("output") as HTMLImageElement;
    if (event.target.files && event.target.files[0]) {
      this.imageSrc = URL.createObjectURL(event.target.files[0]);
      image.src = this.imageSrc;
    }
  }
  updateUser(): void {
    const user: Personne = {
      nomComplet: this.personne.nomComplet,
      user_name: this.personne.user_name,
      adresseMail: this.personne.adresseMail,
      image:  this.personne.image

    };
    this.personService.updateUser(25,user).subscribe(
      () => {
        console.log('user updated successfully.');

      },
      error => {
        console.log(error);
      }

    );
  }
  onSubmit(): void {
this.updateUser();
  }
}

