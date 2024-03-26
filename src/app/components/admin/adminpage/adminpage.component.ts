import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent implements OnInit {
  admins: any[] = [];
  adminForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      pseudo: ['', Validators.required],
      mdp: ['', Validators.required],
      mail: ['', Validators.required]
    });
  }
  
  

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (data: any) => {
        this.admins = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des administrateurs :', error);
        this.errorMessage = 'Erreur lors de la récupération des administrateurs';
      }
    );
  }

  addAdmin(): void {
    if (this.adminForm.valid) {
      const newAdmin = this.adminForm.value;
      this.adminService.addAdmin(newAdmin).subscribe(
        (data: any) => {
          this.successMessage = 'Nouvel administrateur ajouté avec succès';
          this.getAdmins(); 
          this.adminForm.reset();
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'administrateur :', error);
          this.errorMessage = 'Erreur lors de l\'ajout de l\'administrateur';
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs';
    }
  }
  
  
  deleteAdmin(id: number): void {
    this.adminService.deleteAdmin(id).subscribe(
      () => {
        this.successMessage = 'Administrateur supprimé avec succès';
        this.getAdmins(); // Actualiser la liste des administrateurs après la suppression
      },
      (error: any) => {
        console.error('Erreur lors de la suppression de l\'administrateur :', error);
        this.errorMessage = 'Erreur lors de la suppression de l\'administrateur';
      }
    );
  }
}
