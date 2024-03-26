import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonnelService } from '../../../services/personnel/personnel.service';
import { Personnel } from '../../../models/personnel.model';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss'],
})
export class PersonnelComponent implements OnInit {
  personnels: Personnel[] = [];
  personnelForm: FormGroup;
  addPersonnelForm: FormGroup; // Nouveau formulaire pour l'ajout
  errorMessage: string = '';
  successMessage: string = '';
  selectedPersonnel: Personnel | null = null;

  constructor(private personnelService: PersonnelService, private fb: FormBuilder) {
    this.personnelForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      contact: ['', Validators.required],
      adresse: ['', Validators.required],
      pseudo_personnel: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      mdp_personnel: ['', Validators.required],
    });
    // Nouveau formulaire pour l'ajout
    this.addPersonnelForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      contact: ['', Validators.required],
      adresse: ['', Validators.required],
      pseudo_personnel: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      mdp_personnel: ['', Validators.required],
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

  selectPersonnel(personnel: Personnel): void {
    this.selectedPersonnel = personnel;
    this.personnelForm.patchValue(personnel);
  }

  // Nouvelle méthode pour la mise à jour
  updatePersonnel(id: number): void {
    const updatedPersonnelData = this.getUpdatedPersonnelData();
    this.personnelService.updatePersonnel(id, updatedPersonnelData).subscribe(
      () => {
        this.successMessage = 'Informations du personnel mises à jour avec succès';
        const index = this.personnels.findIndex((p) => p.id_pers === id);
        if (index !== -1) {
          this.personnels[index] = {
            ...this.personnels[index],
            ...updatedPersonnelData,
          };
        }
        this.selectedPersonnel = null;
        this.personnelForm.reset();
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour du personnel :', error);
        this.errorMessage = 'Erreur lors de la mise à jour du personnel';
      }
    );
  }

  getUpdatedPersonnelData(): Partial<Personnel> {
    const updatedData: Partial<Personnel> = {};

    Object.keys(this.personnelForm.controls).forEach((key) => {
      const control = this.personnelForm.controls[key];
      if (control.dirty) {
        updatedData[key as keyof Personnel] = control.value;
      }
    });

    return updatedData;
  }

  resetForm(): void {
    this.selectedPersonnel = null;
    this.personnelForm.reset();
  }

  // Nouvelle méthode pour l'ajout
  addPersonnel(): void {
    if (this.addPersonnelForm.valid) {
      this.personnelService.addPersonnel(this.addPersonnelForm.value).subscribe(
        () => {
          this.successMessage = 'Personnel ajouté avec succès';
          this.getPersonnels(); // Rafraîchir la liste après l'ajout
          this.addPersonnelForm.reset();
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
    if (confirm('Êtes-vous sûr de vouloir supprimer ce personnel ?')) {
      this.personnelService.deletePersonnel(id).subscribe(
        () => {
          this.successMessage = 'Personnel supprimé avec succès';
          this.getPersonnels(); // Rafraîchir la liste après la suppression
        },
        (error: any) => {
          console.error('Erreur lors de la suppression du personnel :', error);
          this.errorMessage = 'Erreur lors de la suppression du personnel';
        }
      );
    }
  }
}
