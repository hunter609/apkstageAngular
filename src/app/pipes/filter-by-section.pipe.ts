import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySection'
})
export class FilterBySectionPipe implements PipeTransform {
  transform(entreprises: any[], sectionFilter: string): any[] {
    if (!sectionFilter) {
      return entreprises;
    }
    return entreprises.filter(entreprise => entreprise.section === sectionFilter);
  }
}
