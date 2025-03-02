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
		const isAgedBrie = item.name == 'Aged Brie';
		if (isAgedBrie) {
			this.updateAgedBrie(item);
		} else {
			if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
				if (item.quality > 0) {
					if (item.name != 'Sulfuras, Hand of Ragnaros') {
						item.quality = item.quality - 1
					}
				}
			} else {
				if (item.quality < 50) {
					item.quality = item.quality + 1
					if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
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
				}
			}
			if (item.name != 'Sulfuras, Hand of Ragnaros') {
				item.sellIn = item.sellIn - 1;
			}
			if (item.sellIn < 0) {
				if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
					if (item.quality > 0) {
						if (item.name != 'Sulfuras, Hand of Ragnaros') {
							item.quality = item.quality - 1
						}
					}
				} else {
					item.quality = item.quality - item.quality
				}
			}
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