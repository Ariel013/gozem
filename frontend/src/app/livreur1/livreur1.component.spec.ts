import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Livreur1Component } from './livreur1.component';

describe('Livreur1Component', () => {
  let component: Livreur1Component;
  let fixture: ComponentFixture<Livreur1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Livreur1Component]
    });
    fixture = TestBed.createComponent(Livreur1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
