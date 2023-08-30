import { PersonneService } from './../services/personne.service';
import { Component} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecetteService } from '../services/recette.service';
import { Personne } from '../models/personne';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  constructor(
    private router: Router,private PersonneService:PersonneService,
    private location: Location,private recetteService: RecetteService,private personService:PersonneService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchPersonne();
    }
    personne:Personne={};
    id!:number;

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

}
