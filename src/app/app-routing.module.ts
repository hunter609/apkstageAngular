import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { EntreprisesComponent } from './components/admin/entreprises/entreprises.component';
import { AdminpageComponent } from './components/admin/adminpage/adminpage.component';
import { PersonnelComponent } from './components/admin/personnel/personnel.component';
import { ClassificationComponent } from './components/admin/classification/classification.component';
import { NomenclatureComponent } from './components/admin/nomenclature/nomenclature.component';
import { EnregistrerEntrepriseComponent } from './components/personnel/enregistrer-entreprise/enregistrer-entreprise/enregistrer-entreprise.component';
import { AuthGuard } from './auth.gard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'entreprises', component: EntreprisesComponent, canActivate: [AuthGuard] },
  { path: 'admins', component: AdminpageComponent, canActivate: [AuthGuard] },
  { path: 'personnels', component: PersonnelComponent, canActivate: [AuthGuard] },
  { path: 'classification', component: ClassificationComponent, canActivate: [AuthGuard] },
  { path: 'nomenclature', component: NomenclatureComponent, canActivate: [AuthGuard] },
  { path: 'enregistrer-entreprise', component: EnregistrerEntrepriseComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
