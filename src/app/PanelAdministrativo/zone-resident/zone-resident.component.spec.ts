import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneResidentComponent } from './zone-resident.component';

describe('ZoneResidentComponent', () => {
  let component: ZoneResidentComponent;
  let fixture: ComponentFixture<ZoneResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneResidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
