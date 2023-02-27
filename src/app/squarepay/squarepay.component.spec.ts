import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquarepayComponent } from './squarepay.component';

describe('SquarepayComponent', () => {
  let component: SquarepayComponent;
  let fixture: ComponentFixture<SquarepayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquarepayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquarepayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
