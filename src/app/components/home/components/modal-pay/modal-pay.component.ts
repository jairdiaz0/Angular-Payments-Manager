import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentModel } from '@core-models/payment.model';

import { ItemService } from '@services-items/item.service';
import { PaymentService } from '@services-payments/payment.service';
import { ToolsService } from '@services-tools/tools.service';

@Component({
  selector: 'app-modal-pay',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-pay.component.html',
  styleUrl: './modal-pay.component.css'
})
export class ModalPayComponent {
  /**FormGroups */
  formAdd: FormGroup = new FormGroup({});

  /**Injects */
  private _itemService = inject(ItemService);
  private _paymentService = inject(PaymentService);
  private _toolsService = inject(ToolsService);

  ngOnInit(): void {
    this.formAdd = new FormGroup({
      title: new FormControl('', []),
      amount: new FormControl(0, [
        Validators.required
      ]),
      date: new FormControl(this.getCurrentDate(), [
        Validators.required
      ])
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses comienzan desde 0
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  }

  getItemSelected() {
    return this._itemService.getItemSelected();
  }

  async add() {
    if (this.formAdd.valid) {
      const items = await this._itemService.getItems();
      const itemSelected = this.getItemSelected();
      if (!itemSelected) {
        return;
      }
      const { payments } = itemSelected;
      const { title, amount, date } = this.formAdd.value;
      const payment: PaymentModel = {
        title,
        amount,
        date
      }
      this._paymentService.add(payments, payment, items);
      this.formAdd.reset({
        amount: 0, // O el valor por defecto que prefieras
        date: this.getCurrentDate()
      });
    }
  }
}
