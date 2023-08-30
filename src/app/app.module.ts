import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgImageSliderModule } from 'ng-image-slider';







import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { ListRecetteComponent } from './list-recette/list-recette.component';
import { ViewRecetteComponent } from './view-recette/view-recette.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ViewCategorieComponent } from './view-categorie/view-categorie.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { ListIngredientComponent } from './list-ingredient/list-ingredient.component';
import { AddRecetteComponent } from './add-recette/add-recette.component';
import { UpdateRecetteComponent } from './update-recette/update-recette.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserInfoComponent } from './user-info/user-info.component';

import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ListRecetteComponent,
    ViewRecetteComponent,
    LoginFormComponent,
    SignupFormComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddCategorieComponent,
    ViewCategorieComponent,
    ListCategorieComponent,
    AddIngredientComponent,
    ListIngredientComponent,
    UpdateRecetteComponent,
    AddRecetteComponent,
    ProfileComponent,
    UserProfileComponent,
    UserInfoComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgImageSliderModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
