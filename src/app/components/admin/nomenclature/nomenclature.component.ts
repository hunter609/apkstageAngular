import { Component } from '@angular/core';
import { NomenclatureService } from '../../../services/nomenclature/nomenclature.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.scss']
})
export class NomenclatureComponent {
  uuid: string = '';
  nomenclature: any = null;
  errorMessage: string = '';

  constructor(private nomenclatureService: NomenclatureService) { }

  fetchNomenclature(): void {
    this.nomenclatureService.getNomenclature(this.uuid).subscribe(
      (data: any) => {
        this.nomenclature = data;
        this.errorMessage = ''; 
      },
      (error: any) => {
        this.errorMessage = error.error.error;
        this.nomenclature = null; 
      }
    );
  }

  resetForm(): void {
    this.uuid = ''; 
    this.nomenclature = null; 
    this.errorMessage = ''; 
  }
}
