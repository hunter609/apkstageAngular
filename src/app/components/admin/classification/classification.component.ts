import { Component, OnInit } from '@angular/core';
import { EntreprisesService } from '../../../services/entreprises/entreprises.service'; 
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {
  entreprises: any[] = [];
  sections: any[] = [];
  divisions: any[] = [];
  sectionFilter: string = '';
  divisionFilter: string = '';

  constructor(private entrepriseService: EntreprisesService) { }

  ngOnInit(): void {
    this.loadEntreprises();
    this.loadSections(); 
    this.loadDivisions();
  }

  loadEntreprises(): void {
    this.entrepriseService.getEntreprises().subscribe(
      (entreprises: any[]) => {
        this.entreprises = entreprises;
      },
      (error: any) => { 
        console.error('Erreur lors du chargement des entreprises :', error);
      }
    );
  }

  loadSections(): void {
    this.entrepriseService.getSections().subscribe(
      (sections: any[]) => {
        this.sections = sections;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des sections :', error);
      }
    );
  }

  loadDivisions(): void {
    this.entrepriseService.getDivisions().subscribe(
      (divisions: any[]) => {
        this.divisions = divisions;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des divisions :', error);
      }
    );
  }

  filterBySection(section: string): void {
    this.sectionFilter = section;
  }

  filterByDivision(division: string): void {
    this.divisionFilter = division;
  }
}
