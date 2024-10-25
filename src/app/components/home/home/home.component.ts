import { Component, inject } from '@angular/core';

import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { CardsComponent } from "../components/cards/cards.component";

import { ItemService } from '@services-items/item.service';

import { ItemModel } from '@core-models/item.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items?: Array<ItemModel>;

  /**Injects */
  private _itemService = inject(ItemService);

  async ngOnInit() {
    this.items = await this._itemService.getItems();
  }
}
