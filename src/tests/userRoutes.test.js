const app = require('../app');
const request = require('supertest');


describe('POST /users', () => {


    it('should send POST request and create a new user', async() => {

        const response = await request(app)
            .post('/users/')
            .send({
                name: 'Jeko',
                email: 'zhekogyulev@gmail.com'
            });


        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            name: 'Jeko',
            email: 'zhekogyulev@gmail.com'
        });

    });

    it('should throw error when provide empty user', async() => {

        const response = await request(app)
            .post('/users/')
            .send({});


            expect(response).toMatchObject({});
            expect(response.status).toBe(400);
    });
});


describe('GET /users/id', () => {

    it('should return user with the given id', async() => {

        const createdUser = await request(app)
            .post('/users')
            .send({
                name: 'Jeko',
                email: 'zhekogyulev@gmail.com'
            });

        const id = createdUser.body.id;    

        const response = await request(app)
            .get(`/users/${id}`);


        expect(response.status).toBe(200);
    });


    it('should throw error when no user exists with such id', async() => {


        const response = await request(app)
            .get('/users/123');

        expect(response.status).toBe(404);
        expect(response).toMatchObject({});
        expect(response.body).toMatchObject({
            message: 'User not found'
        });
    });



});






