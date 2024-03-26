import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerEntrepriseComponent } from './enregistrer-entreprise.component';

describe('EnregistrerEntrepriseComponent', () => {
  let component: EnregistrerEntrepriseComponent;
  let fixture: ComponentFixture<EnregistrerEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnregistrerEntrepriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnregistrerEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
