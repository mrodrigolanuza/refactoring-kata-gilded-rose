import {GildedRose} from '../core/gildedRose';
import {Item, StandardItem} from "../core/inventoryItem";

describe('The Gilded Rose', () => {
	it('updates quality for a new item', () => {
		const items = generateCombinationOfItemsFrom(
			['new item', 'Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'],
			range(-1, 13),
			range(0, 51)
		)
		
		const gildedRose = new GildedRose(items);

		const updatedItems = gildedRose.updateQuality();
		
		expect(updatedItems.map(item => item.toString())).toMatchSnapshot();
	});
});

function generateCombinationOfItemsFrom(names:string[], sellinDays: number[], qualities:number[]) {
	return names.flatMap(
		name => sellinDays.flatMap(
			sellin => qualities.flatMap(
				quality => StandardItem.createFrom(new Item(name, sellin, quality)))))
}

function range(from: number, to: number): number[] {
	const length = to - from + 1;
	return Array.from({length}, (_, i) => i + from);
}