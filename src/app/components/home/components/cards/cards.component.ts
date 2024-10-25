import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

import { CardComponent } from "../card/card.component";

import { ItemModel } from '@core-models/item.model';
import { ModalAddComponent } from '../modal-add/modal-add.component';
import { ModalPayComponent } from '../modal-pay/modal-pay.component';
import { ModalHistoryComponent } from '../modal-history/modal-history.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CardComponent, NgFor, ModalAddComponent, ModalPayComponent, ModalHistoryComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() items?: Array<ItemModel>;
}
