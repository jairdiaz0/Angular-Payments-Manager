import { Component, inject, Input } from '@angular/core';

import { ItemModel } from '@core-models/item.model';
import { PaymentModel } from '@core-models/payment.model';

import { CardBtnDeleteComponent } from "../card-btn-delete/card-btn-delete.component";

import { ItemService } from '@services-items/item.service';
import { ToolsService } from '@services-tools/tools.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardBtnDeleteComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() item?: ItemModel;

  /**Injects */
  private _itemService = inject(ItemService);
  private _toolsService = inject(ToolsService);

  getFormatNumber(numberToFormat: number | undefined) {
    return this._toolsService.getFormatNumber(numberToFormat);
  }

  getSubTotal() {
    let subtotal = 0;
    if (this.item) {
      const { payments } = this.item;
      if (payments.length == 0) {
        return subtotal;
      }
      payments.forEach((payment: PaymentModel) => {
        const { amount } = payment;
        subtotal += amount;
      })
    }
    return subtotal;
  }

  getProgressPercentage() {
    if (this.item) {
      const { total } = this.item;
      const subTotal = this.getSubTotal();
      return total > 0 ? (subTotal / total) * 100 : 0;
    }
    return 0;
  }

  setItemSelected() {
    if (!this.item) {
      return;
    }
    this._itemService.setItemSelected(this.item);
  }

  delete() {
    if (this.item) {
      this._itemService.remove(this.item);
    }
  }
}
