import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }
  showProfile: boolean = true;
  showRecipe: boolean = false;
  showAddRecipe: boolean = false;
  selectedOption=1;


  toggleProfile() {
    this.showProfile = true;
    this.showRecipe = false;
    this.showAddRecipe = false;
  }

  toggleRecipe() {
    this.showProfile = false;
    this.showRecipe = true;
    this.showAddRecipe = false;
  }

  toggleAddRecipe() {
    this.showProfile = false;
    this.showRecipe = false;
    this.showAddRecipe = true;
  }


  selectOption(option: number): void {
    this.selectedOption = option;
  }



  ngOnInit(): void {
    const menuIcon = this.elementRef.nativeElement.querySelector('.menuicn');
    const nav = this.elementRef.nativeElement.querySelector('.navcontainer');

    menuIcon.addEventListener('click', () => {
      nav.classList.toggle('navclose');
    });
  }
}

