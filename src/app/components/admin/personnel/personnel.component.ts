import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Supprimez l'import de l'interface Personnel
import { PersonnelService } from '../../../services/personnel/personnel.service'; 

// Définissez l'interface Personnel ici
export interface Personnel {
  id_pers: number;
  nom: string;
  prenom: string;
  contact: string;
  adresse: string;
  pseudo_personnel: string;
  mail: string;
  mdp_personnel: string;
}

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
  personnels: Personnel[] = [];
  personnelForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private personnelService: PersonnelService, private fb: FormBuilder) {
    this.personnelForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      contact: ['', Validators.required],
      adresse: ['', Validators.required],
      pseudo_personnel: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      mdp_personnel: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getPersonnels();
  }

  getPersonnels(): void {
    this.personnelService.getPersonnels().subscribe(
      (data: Personnel[]) => {
        this.personnels = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des personnels :', error);
        this.errorMessage = 'Erreur lors de la récupération des personnels';
      }
    );
  }

  addPersonnel(): void {
    if (this.personnelForm.valid) {
      const newPersonnel: Personnel = this.personnelForm.value;
      this.personnelService.addPersonnel(newPersonnel).subscribe(
        (id: number) => {
          newPersonnel.id_pers = id;
          this.successMessage = 'Nouveau personnel ajouté avec succès';
          this.personnels.push(newPersonnel);
          this.personnelForm.reset();
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout du personnel :', error);
          this.errorMessage = 'Erreur lors de l\'ajout du personnel';
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
    }
  }

  deletePersonnel(id: number): void {
    this.personnelService.deletePersonnel(id).subscribe(
      () => {
        this.successMessage = 'Personnel supprimé avec succès';
        this.personnels = this.personnels.filter(personnel => personnel.id_pers !== id);
      },
      (error: any) => {
        console.error('Erreur lors de la suppression du personnel :', error);
        this.errorMessage = 'Erreur lors de la suppression du personnel';
      }
    );
  }
}
