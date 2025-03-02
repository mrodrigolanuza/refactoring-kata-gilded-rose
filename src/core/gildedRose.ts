export class Item {
	name: string;
	sellIn: number;
	quality: number;

	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

export class GildedRose {
	constructor(public items: Item[]) {	}

	updateQuality() {
		this.items.forEach(item => {
			this.updateQualityFor(item);
		});
		return this.items;
	}

	private updateQualityFor(item: Item){
		switch (item.name) {
			case 'Aged Brie':
				this.updateAgedBrie(item);
				break;
			case 'Backstage passes to a TAFKAL80ETC concert':
				this.updateBackStagePass(item);
				break;
			case 'Sulfuras, Hand of Ragnaros':
				break;
			default:
				this.updateStandardItem(item);
				break;
		}
	}

	private updateStandardItem(item: Item) {
		if (item.quality > 0) {
			item.quality = item.quality - 1
		}
		item.sellIn = item.sellIn - 1;
		if (item.sellIn < 0) {
			if (item.quality > 0) {
				item.quality = item.quality - 1
			}
		}
	}

	private updateBackStagePass(item: Item) {
		if (item.quality < 50) {
			item.quality = item.quality + 1
			if (item.sellIn < 11) {
				if (item.quality < 50) {
					item.quality = item.quality + 1
				}
			}
			if (item.sellIn < 6) {
				if (item.quality < 50) {
					item.quality = item.quality + 1
				}
			}
		}
		item.sellIn = item.sellIn - 1;
		if (item.sellIn < 0) {
			item.quality = item.quality - item.quality
		}
	}

	private updateAgedBrie(item: Item) {
		if (item.quality < 50) {
			item.quality = item.quality + 1
		}
		item.sellIn = item.sellIn - 1;
		if (item.sellIn < 0) {
			if (item.quality < 50) {
				item.quality = item.quality + 1
			}
		}
	}
}