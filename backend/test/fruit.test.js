
const { fruit_1,wrongData, fruit_2,fruit_3,updatedFruit} = require("./utils/fruit.data.test");
const {category_1,category_2}=require("./utils/category.data.test")
const request = require('supertest');
const { app } = require('../app');
const path=require('path');
const db=require("../models/index");
const { User,Category,Fruit } = require("../models");
const { admin } = require("./utils/auth.data.test");
const generatejwt = require('../config/jwtgenerator')

describe('Fruit API', () => {
    let image1;
    let image2;
    let user;
   let jwt;
   let firstCategory;
   let secondCategory;
   let firstFruit;
   let secondFruit
    
    beforeAll(async() => {
        try {
            await db.sequelize.sync({force:true});
               user = await User.create(admin);
               firstCategory=await Category.create(category_1);
               secondCategory=await Category.create(category_2);
               firstFruit=await Fruit.create(fruit_2);
               secondFruit=await Fruit.create(fruit_3);
               image1 = path.resolve(__dirname, `./utils/test_image_data/1.png`);
               image2 = path.resolve(__dirname, `./utils/test_image_data/2.png`);
               jwt = generatejwt(user.id);
        } catch (error) {
            console.error('Error synchronizing database:', error);
        }    
    });
    beforeEach(()=>{
        
    })
    afterAll(() => {
       return db.sequelize.close();
      });


    test('GET api/fruits',async()=>{
        const res=await request(app).get("/api/fruits");
        console.log(res.body.fruits)
        expect(res.statusCode).toEqual(200);
        
        expect(res.body.fruits[0]).toHaveProperty('Category');
        expect(res.body.fruits[0]).toHaveProperty('FruitImages');

    })

    test('GET api/fruits/:fruitId',async()=>{
        const wrongfruitId=100000000000;
        const fruitId=1;
        const wRes= await request(app).get(`/api/fruits/${wrongfruitId}`);
        expect(wRes.statusCode).toEqual(403);
        const res= await request(app).get(`/api/fruits/${fruitId}`);
        expect(res.statusCode).toEqual(200);

    })

    test('POST api/fruits/create -> create fruit', async () => {
        const res = await request(app)
            .post('/api/fruits/create')
            .set('Content-Type','multipart/form-data')
            .set('Authorization', `Bearer ${jwt}`)
            .field('code', fruit_1.code)
            .field('title', fruit_1.title)
            .field('description', fruit_1.description)
            .field('amount', fruit_1.amount)
            .field('price', fruit_1.price)
            .field('CategoryId', fruit_1.CategoryId)
            .field('sales', fruit_1.sales)
            .attach('files', image1) 
            .attach('files', image2)
            ; 
        expect(res.status).toBe(200);
    });
    test('POST api/fruits/create -> get error when insufficient attribute',async()=>{
        const res = await request(app)
            .post('/api/fruits/create')
            .set('Content-Type','multipart/form-data')
            .set('Authorization', `Bearer ${jwt}`)
            .field('title', fruit_1.title)
            .field('description', fruit_1.description)
            .field('amount', fruit_1.amount)
            .field('price', fruit_1.price)
            .field('CategoryId', fruit_1.CategoryId)
            .field('sales', fruit_1.sales)
            .attach('files', image1) 
            .attach('files', image2)
            ; 
        expect(res.status).toBe(403);

    })

    test('DELETE /api/fruits/:fruitId/delete',async()=>{
        const wfruitId=1000000000000;
        const fruitId=1;

        const wRes=await request(app).delete(`/api/fruits/${wfruitId}/delete`)
        .set('Authorization', `Bearer ${jwt}`);
        expect(wRes.statusCode).toEqual(403);

        const  nextRes=await request(app).delete(`/api/fruits/${fruitId}/delete`)
        .set('Authorization', `Bearer ${jwt}`);
        expect(nextRes.statusCode).toEqual(200);
        expect(nextRes.body.fruit.isDeleted).toEqual(1);

        const  nextNextRes=await request(app).delete(`/api/fruits/${fruitId}/delete`)
        .set('Authorization', `Bearer ${jwt}`);
        expect(nextNextRes.statusCode).toEqual(403);
    })

    test('PUT /api/fruits/:fruitId/updateInf',async()=>{
        const wfruitId=11000000000000;
        const fruitId=2;
        const wRes=await request(app).put(`/api/fruits/${wfruitId}/updateInf`)
                                     .set('Authorization', `Bearer ${jwt}`)
                                     .send(updatedFruit);
        expect(wRes.statusCode).toEqual(403);
        const suffiRes=await request(app).put(`/api/fruits/${fruitId}/updateInf`)
                                     .set('Authorization', `Bearer ${jwt}`)
                                     .send(wrongData);
        expect(suffiRes.statusCode).toEqual(403);

        const rightRes=await request(app).put(`/api/fruits/${fruitId}/updateInf`)
                                        .set('Authorization', `Bearer ${jwt}`)
                                        .send(updatedFruit);
        expect(rightRes.statusCode).toEqual(200);
    })

    test('POST /api/fruits/:fruitId/add-image',async()=>{
        const fruitId=2;
        const wfruitId=100000000;
        const wres = await request(app).post(`/api/fruits/${wfruitId}/add-image`)
                                .set('Authorization', `Bearer ${jwt}`)
                                .attach('files', image1) 
                                .attach('files', image2)
                    
        expect(wres.statusCode).toEqual(403);

        const res = await request(app).post(`/api/fruits/${fruitId}/add-image`)
                                .set('Authorization', `Bearer ${jwt}`)
                                .attach('files', image1) 
                                .attach('files', image2)
        expect(res.statusCode).toEqual(200);
    })

    test('post /api/fruits/:fruitId/delete-image',async()=>{
        const fruitId=1;
        const res = await request(app).post(`/api/fruits/${fruitId}/delete-image`)
                                .set('Authorization', `Bearer ${jwt}`)
                                .send({
                                    imageIds:[1,2]
                                })
        expect(res.statusCode).toEqual(200);
    })

    test('GET /api/fruits/search',async()=>{
        const res = await request(app).get(`/api/fruits/search?title=oo`)        
        console.log(res.body.fruits);
        expect(res.statusCode).toEqual(200);

    })
    test('GET /api/fruits/filter',async()=>{
        const res = await request(app).get(`/api/fruits/filter?pricestart=100&priceEnd=1000`)        
        console.log(res.body.fruits);
        expect(res.statusCode).toEqual(200);
    })

    test('GET /api/fruits/searchByCategory',async()=>{
        const wCategory=10000000;
        const category=1;
        const wres = await request(app).get(`/api/fruits/searchByCategory?categoryId=${wCategory}`)        
        expect(wres.statusCode).toEqual(200);
        expect(wres.body.fruits.length).toEqual(0);

        const res = await request(app).get(`/api/fruits/searchByCategory?categoryId=${category}`) 
        console.log(res.body.fruits);       
        expect(res.statusCode).toEqual(200);
        expect(res.body.fruits.length).toBeGreaterThan(0);

    })

    
})
