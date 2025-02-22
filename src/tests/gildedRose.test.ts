import { Item, GildedRose } from '../core/gildedRose';

describe('The Gilded Rose', () => {
	it('updates quality for a new item', () => {
		const items = generateCombinationOfItems(
			['new item', 'Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'], 
			[-1, 0, 6, 11], 
			[0, 1, 50]			
		);
		
		const gildedRose = new GildedRose(items);

		const updatedItems = gildedRose.updateQuality();

		expect(updatedItems[0]).toMatchSnapshot();
	});
});

function generateCombinationOfItems(names:string[], sellInDays:number[], qualities:number[]) {
	return names
		.flatMap((name) => sellInDays
			.flatMap( sellInDay => qualities
				.flatMap(quality => new Item(name, sellInDay, quality))));
}