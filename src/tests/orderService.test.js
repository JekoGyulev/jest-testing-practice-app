const { createOrder, calculateTotal } = require('../services/orderService');
const { v4: uuid } = require('uuid');


describe('createOrder', () => {

    it('should throw Error when empty input parameters', async() => {

        await expect( createOrder({
            userId: null, 
            items: null
        }))
        .rejects.toThrow(new Error('Invalid order data'));

    });

    it('should sum price of items and return an object', async() => {

        const userId = uuid();

        const item = {price: 150.00, quantity: 1};

        const testObject = await createOrder({userId, items: [item]});


        expect(testObject).toHaveProperty('id');
        expect(testObject.userId).toBe(userId);
        expect(testObject.items).toEqual([item]);
        expect(testObject).toHaveProperty('createdAt');
    });

});






describe('calculateTotal', () => {

    it('should throw exception when number of items is 0', () => {
        const items = [];
        expect( () => 
            calculateTotal(items)
        ).toThrow(new Error('Order must contain at least one item'))

    });


    it('should throw exception when price of item is negative when summing all prices', () => {
        const items = [{price: -10 , quantity: 1}];
        
        expect( () => calculateTotal(items))
            .toThrow(new Error('Invalid item price'));
    });


    it('should return sum of all items with valid prices and quantity', () => {

        const items = [
            {price: 10.00, quantity: 1},
            {price: 20.00, quantity: 1}
        ];


        const sum = calculateTotal(items);

        expect(sum).toBe(30);
    });

});







