import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ItemModel } from '@core-models/item.model';

import { ItemService } from '@services-items/item.service';
import { ToolsService } from '@services-tools/tools.service';

@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.css'
})
export class ModalAddComponent {
  /**FormGroups */
  formAdd: FormGroup = new FormGroup({});

  /**Injects */
  private _itemService = inject(ItemService);
  private _toolsService = inject(ToolsService);

  ngOnInit(): void {
    this.formAdd = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]),
      total: new FormControl(0, [
        Validators.required,
        Validators.min(0)
      ]),
    });
  }

  add() {
    if (this.formAdd.valid) {
      const { name, total } = this.formAdd.value;
      const itemModel: ItemModel = {
        name,
        total,
        payments: []
      }
      this._itemService.add(itemModel);
      this.formAdd.reset();
    }
  }
}
