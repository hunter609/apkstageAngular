import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Chart, registerables } from 'chart.js';
import { trigger, transition, animate, style } from '@angular/animations';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';


Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ])
    ])
  ]
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;

  donnees: any[] = [];
  statistiquesAffichees: any = null;
  loading: boolean = true;
  barChartRef: any;
  pieChartRef: any;
  faChartLine = faChartLine;

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.dashboardService.getEntreprises().subscribe(
      (data: any[]) => {
        this.donnees = data;
        this.calculateStatistics();
        this.loading = false;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des données :', error);
        this.loading = false;
      }
    );
  }

  calculateStatistics(): void {
    const activites: { [key: string]: number } = {};
    const sections: { [key: string]: number } = {};
    const divisions: { [key: string]: number } = {};
    const groupes: { [key: string]: number } = {};
    const categories: { [key: string]: number } = {};
    const classes: { [key: string]: number } = {};

    let totalPersonnes = 0;
    let nbPersonnesMax = 0;
    let nbPersonnesMin = Infinity;

    this.donnees.forEach((entreprise) => {
      const activite: string = entreprise.activite.toLowerCase();
      const section: string = entreprise.section.toUpperCase();
      const division: string = entreprise.division.toUpperCase();
      const groupe: string = entreprise.groupe.toUpperCase();
      const classe: string = entreprise.classe.toUpperCase();
      const categorie: string = entreprise.categorie.toUpperCase();

      const nbPersonnes = entreprise.nbpers;
      totalPersonnes += nbPersonnes;

      // Calcul des activités
      if (!activites[activite]) {
        activites[activite] = 1;
      } else {
        activites[activite]++;
      }

      // Calcul des sections
      if (!sections[section]) {
        sections[section] = 1;
      } else {
        sections[section]++;
      }

      // Calcul des divisions
      if (!divisions[division]) {
        divisions[division] = 1;
      } else {
        divisions[division]++;
      }

      // Calcul des groupes
      if (!groupes[groupe]) {
        groupes[groupe] = 1;
      } else {
        groupes[groupe]++;
      }

      // Calcul des catégories
      if (!categories[categorie]) {
        categories[categorie] = 1;
      } else {
        categories[categorie]++;
      }

      // Calcul des classes
      if (!classes[classe]) {
        classes[classe] = 1;
      } else {
        classes[classe]++;
      }

      // Calcul du nombre maximum de personnes dans une entreprise
      if (nbPersonnes > nbPersonnesMax) {
        nbPersonnesMax = nbPersonnes;
      }

      // Calcul du nombre minimum de personnes dans une entreprise
      if (nbPersonnes < nbPersonnesMin) {
        nbPersonnesMin = nbPersonnes;
      }
    });

    const activitesTrie = Object.entries(activites).sort((a, b) => b[1] - a[1]);
    const sectionsTrie = Object.entries(sections).sort((a, b) => a[0].localeCompare(b[0]));
    const divisionsTrie = Object.entries(divisions).sort((a, b) => a[0].localeCompare(b[0]));
    const groupesTrie = Object.entries(groupes).sort((a, b) => a[0].localeCompare(b[0]));
    const categoriesTrie = Object.entries(categories).sort((a, b) => a[0].localeCompare(b[0]));
    const classesTrie = Object.entries(classes).sort((a, b) => a[0].localeCompare(b[0]));

    this.statistiquesAffichees = {
      entreprises: this.donnees.length,
      totalPersonnes,
      nbPersonnesMax,
      nbPersonnesMin,
      activites: activitesTrie,
      sections: sectionsTrie,
      divisions: divisionsTrie,
      groupes: groupesTrie,
      categories: categoriesTrie,
      classes: classesTrie,
    };
    this.generateCharts(activites, sections);
  }
 
  generateCharts(activites: any, sections: any): void {
    // Bar Chart
    if (this.barChart && this.barChart.nativeElement) {
      this.barChartRef = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: Object.keys(activites),
          datasets: [{
            label: 'Activités',
            data: Object.values(activites),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              type: 'linear', 
              beginAtZero: true
            }
          }
        }
      });
    }
  }
  
}
