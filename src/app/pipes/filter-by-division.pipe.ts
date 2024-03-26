import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDivision'
})
export class FilterByDivisionPipe implements PipeTransform {
  transform(entreprises: any[], divisionFilter: string): any[] {
    if (!divisionFilter) {
      return entreprises;
    }
    return entreprises.filter(entreprise => entreprise.division === divisionFilter);
  }
}
