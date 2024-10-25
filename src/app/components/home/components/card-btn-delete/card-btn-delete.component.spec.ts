import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBtnDeleteComponent } from './card-btn-delete.component';

describe('CardBtnDeleteComponent', () => {
  let component: CardBtnDeleteComponent;
  let fixture: ComponentFixture<CardBtnDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBtnDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardBtnDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
