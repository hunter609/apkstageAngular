import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.gard';

import { AppComponent } from './app.component';
import { EntreprisesComponent } from './components/admin/entreprises/entreprises.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { NomenclatureComponent } from './components/admin/nomenclature/nomenclature.component'; 
import { PersonnelComponent } from './components/admin/personnel/personnel.component';
import { ClassificationComponent } from './components/admin/classification/classification.component';
import { FilterBySectionPipe } from './pipes/filter-by-section.pipe';
import { FilterByDivisionPipe } from './pipes/filter-by-division.pipe';
import { AdminpageComponent } from './components/admin/adminpage/adminpage.component';
import { EnregistrerEntrepriseComponent } from './components/personnel/enregistrer-entreprise/enregistrer-entreprise/enregistrer-entreprise.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'entreprises', component: EntreprisesComponent, canActivate:[AuthGuard] },
  { path: 'admins', component: AdminpageComponent, canActivate:[AuthGuard] },
  { path: 'personnels', component: PersonnelComponent, canActivate:[AuthGuard] },
  { path: 'classification', component: ClassificationComponent, canActivate:[AuthGuard] },
  { path: 'nomenclature', component: NomenclatureComponent, canActivate:[AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    EntreprisesComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    NomenclatureComponent,
    PersonnelComponent,
    ClassificationComponent,
    FilterBySectionPipe,
    FilterByDivisionPipe,
    AdminpageComponent,
    EnregistrerEntrepriseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes), 
    ReactiveFormsModule 
  ],
  providers: [ 
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
