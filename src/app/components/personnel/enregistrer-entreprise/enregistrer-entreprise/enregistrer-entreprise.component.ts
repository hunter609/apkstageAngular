import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../services/auth/auth.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-enregistrer-entreprise',
  templateUrl: './enregistrer-entreprise.component.html',
  styleUrls: ['./enregistrer-entreprise.component.scss']
})
export class EnregistrerEntrepriseComponent {
  entrepriseForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  prenom: string | null = null;

  constructor(private formBuilder: FormBuilder, 
              private http: HttpClient,
              private authService: AuthService, 
              private router: Router
              ) {
    this.entrepriseForm = this.formBuilder.group({
      nom_entreprise: ['', Validators.required],
      nom_proprietaire: ['', Validators.required],
      prenom_proprietaire: ['', Validators.required],
      activite: ['', Validators.required],
      coor: ['', Validators.required],
      telephone: ['', Validators.required],
      date_enregistrement: ['', Validators.required],
      prenom_pers: [this.prenom, Validators.required],
      nbpers: ['', Validators.required],
      numIdFiscale: ['', Validators.required],
      numStat: ['', Validators.required],
      section: ['', Validators.required],
      division: ['', Validators.required],
      groupe: ['', Validators.required],
      classe: ['', Validators.required],
      categorie: ['', Validators.required],
      sous_categorie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.prenom = localStorage.getItem('prenom');
  }

  onSubmit() {
    if (this.entrepriseForm.valid) {
      const authToken = localStorage.getItem('token');
      if (!authToken) {
        console.error('Token d\'authentification non trouvé dans le localStorage');
        return;
      }

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        })
      };

      this.http.post<any>('http://localhost:8080/enregistrer', this.entrepriseForm.value, httpOptions).subscribe(
        response => {
          console.log('Entreprise enregistrée avec succès!', response);
          this.successMessage = "Enregistrement réussi !";
          this.entrepriseForm.reset();
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de l\'entreprise', error);
          // Gérer les erreurs ici
        }
      );
    } else {
      this.errorMessage = "Veuillez remplir tout les champs !"
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
  okSuccess(){
    this.successMessage = null;
  }
  okError(){
    this.errorMessage = null;
  }
}
