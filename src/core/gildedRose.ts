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
	protected constructor(protected name: string,
						  protected sellIn: number,
						  protected quality: number) {
	}
	static createFrom(item: Item): StandardItem {
		switch (item.name) {
			case 'Aged Brie':
				return new AgedBrie(item.name, item.sellIn, item.quality);
			case 'Backstage passes to a TAFKAL80ETC concert':
				return new BackStagePass(item.name, item.sellIn, item.quality);
			case 'Sulfuras, Hand of Ragnaros':
				return new Sulfuras(item.name, item.sellIn, item.quality);
			default:
				return new StandardItem(item.name, item.sellIn, item.quality);
		}
	}

	updateQuality(){
		if (this.quality > 0) {
			this.quality = this.quality - 1
		}
		this.sellIn = this.sellIn - 1;
		if (this.sellIn < 0) {
			if (this.quality > 0) {
				this.quality = this.quality - 1
			}
		}
	}
	
	toString():string {
		return `Name: ${this.name} | Sell In: ${this.sellIn} | Quality: ${this.quality}`
	}
}

export class AgedBrie extends StandardItem {
	updateQuality() {
		if (this.quality < 50) {
			this.quality = this.quality + 1
		}
		this.sellIn = this.sellIn - 1;
		if (this.sellIn < 0) {
			if (this.quality < 50) {
				this.quality = this.quality + 1
			}
		}
	}
}
export class BackStagePass extends StandardItem {
	updateQuality() {
		if (this.quality < 50) {
			this.quality = this.quality + 1
			if (this.sellIn < 11) {
				if (this.quality < 50) {
					this.quality = this.quality + 1
				}
			}
			if (this.sellIn < 6) {
				if (this.quality < 50) {
					this.quality = this.quality + 1
				}
			}
		}
		this.sellIn = this.sellIn - 1;
		if (this.sellIn < 0) {
			this.quality = this.quality - this.quality
		}
	}
}
export class Sulfuras extends StandardItem {
	updateQuality() {}
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