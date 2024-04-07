
const { fruit_1 } = require("./utils/fruit.data.test");
const request = require('supertest');
const app = require('../app');
const path=require('path');
const db=require("../models/index");
const fruit = require("../models/fruit");
describe('Fruit API', () => {
    let image1;
    let image2;
    
    beforeAll(() => {
        try {
            // return db.sequelize.sync();
        } catch (error) {
            // console.error('Error synchronizing database:', error);
            // process.exit(1); // Exit the test suite with a non-zero status code
        }    
    });
    beforeEach(()=>{
        image1 = path.resolve(__dirname, `./utils/test_image_data/1.png`);
        image2 = path.resolve(__dirname, `./utils/test_image_data/2.png`);
    })
    afterAll(() => {
    //    return db.sequelize.close();
      });

    test('POST /fruits/create -> create fruit', async () => {
        console.log(image1);
       
        const res = await request(app)
            .post('/api/fruits/create')
            .set('Content-Type','multipart/form-data')
            .field('code', fruit_1.code)
            .field('title', fruit_1.title)
            .field('description', fruit_1.description)
            .field('amount', fruit_1.amount)
            .field('price', fruit_1.price)
            .field('categoryId', fruit_1.categoryId)
            .field('sales', fruit_1.sales)
            .attach('files', image1) 
            .attach('files', image2)
            ; 
        // console.log(res);

        expect(res.status).toBe(200);
    });

    
})
