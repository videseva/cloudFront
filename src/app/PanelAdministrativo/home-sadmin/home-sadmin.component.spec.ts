import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSadminComponent } from './home-sadmin.component';

describe('HomeSadminComponent', () => {
  let component: HomeSadminComponent;
  let fixture: ComponentFixture<HomeSadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
