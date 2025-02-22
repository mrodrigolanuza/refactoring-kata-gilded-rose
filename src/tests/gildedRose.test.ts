import { Item, GildedRose } from '../core/gildedRose';

describe('The Gilded Rose', () => {
	it('updates quality for a new item', () => {
		const items = generateCombinationOfItemsFrom(
			['new item', 'Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'],
			[-1, 0, 3, 6, 13],
			[0, 1, 51]
		)
		
		const gildedRose = new GildedRose(items);

		const updatedItems = gildedRose.updateQuality();

		expect(updatedItems).toMatchSnapshot();
	});
});

function generateCombinationOfItemsFrom(names:string[], sellinDays: number[], qualities:number[]) {
	return names.flatMap(
		name => sellinDays.flatMap(
			sellin => qualities.flatMap(
				quality => new Item(name, sellin, quality))))
}