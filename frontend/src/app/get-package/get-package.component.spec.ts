import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPackageComponent } from './get-package.component';

describe('GetPackageComponent', () => {
  let component: GetPackageComponent;
  let fixture: ComponentFixture<GetPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetPackageComponent]
    });
    fixture = TestBed.createComponent(GetPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
