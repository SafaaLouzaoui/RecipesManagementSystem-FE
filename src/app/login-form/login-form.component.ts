import { Component,ViewEncapsulation } from '@angular/core';
import { Personne } from '../models/personne';
import { PersonneService } from '../services/personne.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'
             ],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent {
  image_login: any = "./assets/images/loginImage4.jpg";
  image_backgound_login: any = "../assets/images/loginImage.jpg"

  user: Personne = new Personne();
  constructor(private router: Router, private http: HttpClient, private loginperson: PersonneService,
    private userService: PersonneService) {

  }


  Login(user:Personne) {
       this.loginperson.LoginUser(this.user).subscribe(
      (resultData:any) => {

        if (resultData.message === "Login Success (User)") {

          localStorage.setItem('token',Math.random().toString());
          this.router.navigate(['/recettes/add']);
          // this.router.navigate(['/profil/'+resultData.id]);
          // sessionStorage.setItem('session',resultData.id);
          // sessionStorage.setItem('session2', resultData.message);
          //  const userId = resultData.id;
          //  const userpos = resultData.message
          // this.userService.setUserId(userId);
          // this.userService.setUserPos(userpos);




        }
        // else if (resultData.message === "Login Success (Moderator)") {
        //   this.router.navigate(['/moderateur/'+resultData.id]);
        //   sessionStorage.setItem('session', resultData.id);
        //   sessionStorage.setItem('session2', resultData.message);
        //   const userId = resultData.id;
        //   const userpos = resultData.message
        //  this.userService.setUserId(userId);
        //  this.userService.setUserPos(userpos);



        // }
        else if (resultData.message === "Ce compte a été bloqué ou Supprimer" && resultData.status === false
        && resultData.id === null ) {
        alert('Ce compte a été bloqué ou Supprimer');

        }
        // else if (resultData.message === "Rôle inconnu") {
        //   this.router.navigate(['/login']);
        //   alert('Login Failed');

        // }
        else if (resultData.message === "Mot de passe incorrect") {
          this.router.navigate(['/login']);
          alert('password Not Match');

        }
        // else if (resultData.message === "Login Success (Administrator)") {
        //   sessionStorage.setItem('session', resultData.id);
        //   sessionStorage.setItem('session2', resultData.message);
        //   this.router.navigate(['/admin']);
        //   const userId = resultData.id;
        //   const userpos = resultData.message
        //  this.userService.setUserId(userId);
        //  this.userService.setUserPos(userpos);

        // }

        else if (resultData.message === "L'adresse e-mail n'existe pas") {
          this.router.navigate(['/login']);

        }
      }
    );

  }


}
