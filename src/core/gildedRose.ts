import {InventoryItem} from "./inventoryItem";

export class GildedRose {
	constructor(public items: InventoryItem[]) {	}

	updateQuality() {
		this.items.forEach(item => {
			item.updateQuality();
		});
		return this.items;
	}
}