import { Injectable } from '@angular/core';

import { Preferences } from '@capacitor/preferences';

import { ItemModel } from '@core-models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _items: Array<ItemModel> = [];
  private itemSelected?: ItemModel;
  private readonly STORAGE_KEY = 'items'; // Clave para el almacenamiento


  async loadItems(): Promise<void> {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    this._items = value ? JSON.parse(value) : []; // Carga los items desde storage
  }

  async getItems(): Promise<Array<ItemModel>> {
    if (this._items.length === 0) {
      await this.loadItems(); // Asegura que se hayan cargado los items
    }
    return this._items;
  }

  async add(item: ItemModel): Promise<void> {
    this._items.unshift(item);
    await this.saveItems(); // Guarda los cambios
  }

  async remove(item: ItemModel): Promise<ItemModel> {
    const index = this._items.indexOf(item);
    const removedItem = this._items.splice(index, 1)[0];
    await this.saveItems(); // Guarda los cambios después de eliminar
    return removedItem;
  }

  getItemSelected(): ItemModel | undefined {
    return this.itemSelected;
  }

  setItemSelected(item: ItemModel): void {
    this.itemSelected = item;
  }

  private async saveItems(): Promise<void> {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(this._items),
    });
  }
}
