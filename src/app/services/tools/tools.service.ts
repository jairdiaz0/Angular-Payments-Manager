import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  getFormatNumber(numberToFormat: number | undefined) {
    if (numberToFormat) {
      return numberToFormat.toLocaleString('en-US');
    }
    return 'N/A';
  }

  onAmountInput(event: any, form: FormGroup, formName: string): void {
    const input = event.target;
    let value = input.value.replace(/,/g, ''); // Elimina comas anteriores
    if (!isNaN(value) && value) {
      value = parseFloat(value).toLocaleString('en-US'); // Agrega formato con comas
      input.value = value;
    }
    form.get(formName)?.setValue(value.replace(/,/g, '')); // Guarda sin comas en el FormControl
  }

  onAmountBlur(form: FormGroup, formName: string): void {
    const amountControl = form.get(formName);
    if (amountControl?.value) {
      const formattedValue = parseFloat(amountControl.value).toLocaleString('en-US');
      amountControl.setValue(formattedValue, { emitEvent: false });
    }
  }
}
