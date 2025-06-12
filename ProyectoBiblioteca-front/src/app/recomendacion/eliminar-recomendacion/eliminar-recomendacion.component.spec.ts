import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRecomendacionComponent } from './eliminar-recomendacion.component';

describe('EliminarRecomendacionComponent', () => {
  let component: EliminarRecomendacionComponent;
  let fixture: ComponentFixture<EliminarRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarRecomendacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
