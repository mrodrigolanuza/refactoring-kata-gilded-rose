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

export interface InventoryItem {
	updateQuality();
}

export class StandardItem implements InventoryItem {
	private constructor(private name: string, 
						private sellIn: number, 
						private quality: number) {
	}
	static createFrom(item: Item): InventoryItem {
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
		this.decreaseSellIn();
		if (this.quality > 0) {
			this.decreaseQuality();
		}
		if (this.sellIn < 0) {
			if (this.quality > 0) {
				this.decreaseQuality();
			}
		}
	}

	private decreaseQuality() {
		this.quality = this.quality - 1
	}

	private decreaseSellIn() {
		this.sellIn = this.sellIn - 1;
	}

	toString():string {
		return `Name: ${this.name} | Sell In: ${this.sellIn} | Quality: ${this.quality}`
	}
}

export class AgedBrie implements InventoryItem {
	constructor(private name: string,
				private sellIn: number,
				private quality: number) {
	}
	updateQuality() {
		this.increaseQuality();
		this.decreaseSellIn();
		if (this.sellIn < 0) {
			this.increaseQuality();
		}
	}

	private decreaseSellIn() {
		this.sellIn = this.sellIn - 1;
	}

	private increaseQuality() {
		if (this.quality < 50) {
			this.quality = this.quality + 1
		}
	}

	toString():string {
		return `Name: ${this.name} | Sell In: ${this.sellIn} | Quality: ${this.quality}`
	}
}

export class BackStagePass implements InventoryItem {
	constructor(private name: string,
				private sellIn: number,
				private quality: number) {
	}
	updateQuality() {
		const maxQuality = 50;
		if (this.quality < maxQuality) {
			this.increaseQuality();
			this.increaseQualityWhenLowerThan(maxQuality, 11);
			this.increaseQualityWhenLowerThan(maxQuality, 6);
		}
		this.decreaseSellIn();
		this.decreaseQuality();
	}

	private decreaseQuality() {
		if (this.sellIn < 0) {
			this.quality = 0;
		}
	}

	private increaseQualityWhenLowerThan(maxQuality: number, maxSellIn: number) {
		if (this.sellIn < maxSellIn && this.quality < maxQuality) {
			this.increaseQuality();
		}
	}

	private decreaseSellIn() {
		this.sellIn = this.sellIn - 1;
	}

	private increaseQuality() {
		this.quality = this.quality + 1
	}

	toString():string {
		return `Name: ${this.name} | Sell In: ${this.sellIn} | Quality: ${this.quality}`
	}
}

export class Sulfuras implements InventoryItem {
	constructor(private name: string,
				private sellIn: number,
				private quality: number) {
	}
	updateQuality() {}

	toString():string {
		return `Name: ${this.name} | Sell In: ${this.sellIn} | Quality: ${this.quality}`
	}
}