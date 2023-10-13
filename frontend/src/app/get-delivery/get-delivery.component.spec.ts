import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDeliveryComponent } from './get-delivery.component';

describe('GetDeliveryComponent', () => {
  let component: GetDeliveryComponent;
  let fixture: ComponentFixture<GetDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetDeliveryComponent]
    });
    fixture = TestBed.createComponent(GetDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
