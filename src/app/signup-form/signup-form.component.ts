import { SignupService } from './../services/signup.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  image_login :any ="./assets/images/loginImage3.jpg";
  image_backgound_login:any ="../assets/images/loginImage.jpg";
  nom_complet:string ="";
  username :string ="";
  adresse_mail :string ="";
  mot_de_passe:  string ="";

  constructor( private router: Router,private http : HttpClient, private signupService: SignupService){
  }
ngOnInit(){


}
  addUser(){
   let bodyData  =  {
    "nomComplet": this.nom_complet,
    "username" : this.username,
    "adresseMail" : this.adresse_mail,
    "motDePasse" : this.mot_de_passe
   };

  // Call the signUp method from the AuthService
  this.signupService.signUp(bodyData).then(
    () => {
      // Sign up successful, show the success popup
      this.showSuccessPopup();

      // After showing the popup, navigate to the login page
      // setTimeout(() => {
      //   this.router.navigate(['/login']);
      // }, 3000); // Wait for 3 seconds before navigating to login
    },
    (error) => {
      // Handle sign-up failure if needed
      console.error('Sign-up failed:', error);
    }
  );
}
showSuccessPopup(): void {
  alert('Sign up successful!'); // You can use a custom modal or toast message instead
}

}


