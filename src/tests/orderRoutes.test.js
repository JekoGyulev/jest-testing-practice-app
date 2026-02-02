
const request = require('supertest');
const app = require('../app');


describe('POST /orders', () => {

    it('should create new user and return it', async() => {

        const response = await request(app)
            .post('/orders')
            .send({
                userId: 123,
                items: [{price: 10.00, quantity: 1}]
            });


        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            userId: 123,
            items: [{price: 10.00, quantity: 1}]
        });   
    });


    it('should throw error when fields are invalid', async() => {

        const response = await request(app)
            .post('/orders')
            .send({
                userId: null, 
                items: null
            });


        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            message: 'Invalid order data'
        });    
    });
});


describe('POST /orders/total', () => {

    it('should throw error when items is empty', async() => {
        
        const response = await request(app)
            .post('/orders/total')
            .send({
                items: []
            });

        expect(response.status).toBe(500);
        expect(response.body).toMatchObject({
            message: 'Order must contain at least one item'
        });  
    });

    it(`should throw error when item's price is negative`, async() => {

        const items = [{price: -10, quantity: 1}];

        const response = await request(app)
        .post('/orders/total')
        .send({
            items: items
        });

        expect(response.status).toBe(500);
        expect(response.body).toMatchObject({
            message: 'Invalid item price'
        });
    });

    it(`should return total sum of item's price`, async() => {

        const items = [{price: 25.00, quantity: 1}];

        const response = await request(app)
            .post('/orders/total')
            .send({
                items: items
            });


        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            total: 25.00
        });  

    });



});






