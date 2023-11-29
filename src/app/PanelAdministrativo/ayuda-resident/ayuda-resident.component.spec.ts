import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaResidentComponent } from './ayuda-resident.component';

describe('AyudaResidentComponent', () => {
  let component: AyudaResidentComponent;
  let fixture: ComponentFixture<AyudaResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AyudaResidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyudaResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
