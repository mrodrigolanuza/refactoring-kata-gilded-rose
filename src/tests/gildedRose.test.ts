import { Item, GildedRose } from '../core/gildedRose';

describe('The Gilded Rose', () => {
	it('updates quality for a new item', () => {
		const items = generateCombinationOfItems(
			['new item'], 
			[0], 
			[0]			
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
				.flatMap(quality => new Item(name, sellInDays, quality))));
}