import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSadminComponent } from './account-sadmin.component';

describe('AccountSadminComponent', () => {
  let component: AccountSadminComponent;
  let fixture: ComponentFixture<AccountSadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
