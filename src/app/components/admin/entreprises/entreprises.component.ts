import { Component, OnInit } from '@angular/core';
import { EntreprisesService } from '../../../services/entreprises/entreprises.service';
import { NavbarComponent } from '../navbar/navbar.component'; 

@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.scss']
})
export class EntreprisesComponent implements OnInit {
  entreprises: any[] = [];
  entrepriseAModifier: any = null; // Pour stocker les données de l'entreprise à modifier

  constructor(private entreprisesService: EntreprisesService) { }

  ngOnInit(): void {
    this.getEntreprises();
  }

  getEntreprises(): void {
    this.entreprisesService.getEntreprises()
      .subscribe(entreprises => {
        // Trier les entreprises par date d'enregistrement (du plus récent au plus ancien)
        this.entreprises = entreprises.sort((a, b) => {
          return new Date(b.date_enregistrement).getTime() - new Date(a.date_enregistrement).getTime();
        });
      });
  }

  modifierEntreprise(entreprise: any): void {
    this.entrepriseAModifier = { ...entreprise }; // Cloner l'objet pour éviter les modifications directes dans le tableau
  }

  modifierEntrepriseSubmit(): void {
    if (this.entrepriseAModifier) {
      this.entreprisesService.modifierEntreprise(this.entrepriseAModifier)
        .subscribe(() => {
          console.log('Entreprise modifiée avec succès');
          this.entrepriseAModifier = null; // Réinitialiser l'entreprise à modifier après la soumission
          this.getEntreprises(); // Rafraîchir la liste des entreprises après modification
        }, error => {
          console.error('Erreur lors de la modification de l\'entreprise :', error);
          // Gérer l'erreur ici
        });
    }
  }

  supprimerEntreprise(uuid: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette entreprise?")) {
      this.entreprisesService.supprimerEntreprise(uuid)
        .subscribe(() => {
          console.log('Entreprise supprimée avec succès');
          this.getEntreprises(); // Rafraîchir la liste des entreprises après suppression
        }, error => {
          console.error('Erreur lors de la suppression de l\'entreprise :', error);
          // Gérer l'erreur ici
        });
    }
  }
}
