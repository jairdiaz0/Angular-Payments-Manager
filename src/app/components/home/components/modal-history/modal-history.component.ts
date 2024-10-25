import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ItemService } from '@services-items/item.service';
import { ToolsService } from '@services-tools/tools.service';

@Component({
  selector: 'app-modal-history',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './modal-history.component.html',
  styleUrl: './modal-history.component.css'
})
export class ModalHistoryComponent {

  /**Injects */
  private _itemService = inject(ItemService)
  private _toolsService = inject(ToolsService)

  getItemSelected() {
    return this._itemService.getItemSelected();
  }
  
  getFormatNumber(numberToFormat: number | undefined) {
    return this._toolsService.getFormatNumber(numberToFormat);
  }
}
