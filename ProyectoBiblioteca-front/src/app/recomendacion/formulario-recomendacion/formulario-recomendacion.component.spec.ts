import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRecomendacionComponent } from './formulario-recomendacion.component';

describe('FormularioRecomendacionComponent', () => {
  let component: FormularioRecomendacionComponent;
  let fixture: ComponentFixture<FormularioRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioRecomendacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
