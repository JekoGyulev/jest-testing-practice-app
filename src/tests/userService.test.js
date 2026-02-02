const { createUser, getUserById } = require('../services/userService');

const { v4: uuid } = require('uuid');


describe('createUser', () => {
        test('creates a new user', async() => {

            const user = await createUser({
                name: 'Jeko',
                email: 'zhekogyulev@gmail.com' 
            });

            expect(user).toMatchObject({
                name: 'Jeko',
                email: 'zhekogyulev@gmail.com'
            });
        });


        test('throws error for missing fields when creating new user', async () => {

            await expect( 
                createUser({
                    name: 'Jeko',
                    email: null
                })
            )
            .rejects.toThrow(new Error('Name and email are required'));
        });
});


describe('getUserById', () => {
        test('retrives the user with the given ID', async () => {

            const newUser = await createUser({name: 'jeko', email: 'zhekogyulev@gmail.com'});

            const retrievedUser = await getUserById(newUser.id);


            expect(retrievedUser.name).toBe('jeko');
            expect(retrievedUser.email).toBe('zhekogyulev@gmail.com');
            expect(newUser.id).toBe(retrievedUser.id);
        });

        test('throws error when the ID of user does not exist in the database', async() => {
            await expect(
                getUserById(uuid())
            )
            .rejects.toThrow(new Error('User not found'));
        });
});


