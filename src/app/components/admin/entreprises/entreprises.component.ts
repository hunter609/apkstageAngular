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

  constructor(private entreprisesService: EntreprisesService) { }

  ngOnInit(): void {
    this.getEntreprises();
  }

  getEntreprises(): void {
    this.entreprisesService.getEntreprises()
      .subscribe(entreprises => {
        this.entreprises = entreprises;
      });
  }
}
