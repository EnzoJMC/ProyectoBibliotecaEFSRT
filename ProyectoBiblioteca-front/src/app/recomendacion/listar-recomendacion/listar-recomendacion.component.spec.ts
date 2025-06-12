import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecomendacionComponent } from './listar-recomendacion.component';

describe('ListarRecomendacionComponent', () => {
  let component: ListarRecomendacionComponent;
  let fixture: ComponentFixture<ListarRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarRecomendacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
