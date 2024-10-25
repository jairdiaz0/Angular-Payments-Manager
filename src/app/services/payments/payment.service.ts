import { Injectable } from '@angular/core';
import { ItemModel } from '@core-models/item.model';

import { Preferences } from '@capacitor/preferences';

import { PaymentModel } from '@core-models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly STORAGE_KEY = 'items';

  async add(payments: Array<PaymentModel>, payment: PaymentModel, items: Array<ItemModel>): Promise<void> {
    payments.unshift(payment);
    await this.saveItems(items); // Guarda los cambios en los items después de añadir un pago
  }

  private async saveItems(items: Array<ItemModel>): Promise<void> {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(items),
    });
  }
}
