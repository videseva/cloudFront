import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverAdminComponent } from './reserver-admin.component';

describe('ReserverAdminComponent', () => {
  let component: ReserverAdminComponent;
  let fixture: ComponentFixture<ReserverAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserverAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserverAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
