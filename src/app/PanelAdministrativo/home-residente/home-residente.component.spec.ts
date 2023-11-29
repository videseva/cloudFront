import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResidenteComponent } from './home-residente.component';

describe('HomeResidenteComponent', () => {
  let component: HomeResidenteComponent;
  let fixture: ComponentFixture<HomeResidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResidenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeResidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
