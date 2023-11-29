import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWebComponent } from './page-web.component';

describe('PageWebComponent', () => {
  let component: PageWebComponent;
  let fixture: ComponentFixture<PageWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
