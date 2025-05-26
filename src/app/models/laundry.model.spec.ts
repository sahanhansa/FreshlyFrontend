import { Laundry } from './laundry.model';

describe('Laundry', () => {
  it('should create an instance', () => {
    const laundry: Laundry = {
      id: 1,
      name: 'Test Laundry',
      location: 'Test Location',
      rating: 4.5,
      hasRatings: true,
      imageUrl: 'test.jpg',
      itemIds: [1, 2, 3]
    };
    expect(laundry).toBeTruthy();
  });
});
