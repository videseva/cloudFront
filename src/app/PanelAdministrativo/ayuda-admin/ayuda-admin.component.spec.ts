import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaAdminComponent } from './ayuda-admin.component';

describe('AyudaAdminComponent', () => {
  let component: AyudaAdminComponent;
  let fixture: ComponentFixture<AyudaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AyudaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyudaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
