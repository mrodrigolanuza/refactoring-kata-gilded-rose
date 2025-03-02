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

export class StandardItem {
	protected constructor(private name: string,
						  private sellIn: number,
						  private quality: number) {	}
	static create(item: Item): StandardItem {
		return new StandardItem(item.name, item.sellIn, item.quality); 
	}

	updateQuality(){
		switch (this.name) {
			case 'Aged Brie':
				this.updateAgedBrie(this);
				break;
			case 'Backstage passes to a TAFKAL80ETC concert':
				this.updateBackStagePass(this);
				break;
			case 'Sulfuras, Hand of Ragnaros':
				break;
			default:
				this.updateStandardItem(this);
				break;
		}
	}
	
	toString():string {
		return `Name: ${this.name} | Sell In: ${this.sellIn} | Quality: ${this.quality}`
	}

	private updateStandardItem(item: StandardItem) {
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

	private updateBackStagePass(item: StandardItem) {
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

	private updateAgedBrie(item: StandardItem) {
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

export class GildedRose {
	constructor(public items: StandardItem[]) {	}

	updateQuality() {
		this.items.forEach(item => {
			item.updateQuality();
		});
		return this.items;
	}
}