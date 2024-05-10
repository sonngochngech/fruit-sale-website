const request = require('supertest');
const { app } = require('../app');
const { User } = require("../models");
const generatejwt = require('../config/jwtgenerator')
const db = require("../models/index");
require("dotenv").config();
const { registerData, registerUser, basicUser, loginData, wrongLoginData, sufficientAttributeUserSate, unexistedData, passworData } = require("./utils/auth.data.test")


describe('auth endpoint  with no user ', () => {

     beforeEach(() => {
          try {
               return db.sequelize.sync({ force: true });
          } catch (error) {
               console.error('Error synchronizing database:', error);
               process.exit(1); // Exit the test suite with a non-zero status code
          }
     });

     //  afterAll(async () => {
     //      try{
     //         await db.sequelize.close();
     //      }catch (error) {
     //           process.exit(1); 
     //       }    

     // });
     test("GET  /api/auth/requestToken   -> should get a token", async () => {
          const res = await request(app).post("/api/auth/requestToken")
               .send(registerData);
          expect(res.statusCode).toEqual(200);
     })


     test("POST /api/auth/register -> should regiter a user", async () => {
          const res = await request(app).post("/api/auth/requestToken")
               .send(registerData);
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('temporaryToken');
          console.log(res.body.temporaryToken);

          const regisRes = await request(app).post("/api/auth/register")
               .send({
                    ...registerUser,
                    token: res.body.temporaryToken.code
               })
          expect(regisRes.statusCode).toEqual(200)

     })

     test(" POST /api/auth/register ->  should get error if the required attributes is sufficient", async () => {
          const res = await request(app).post("/api/auth/requestToken")
               .send(registerData);
          expect(res.statusCode).toEqual(200);
          const regisRes = await request(app).post("/api/auth/register")
               .send({
                    ...sufficientAttributeUserSate,
                    token: res.temporaryToken
               })
          expect(regisRes.statusCode).toEqual(403)

     })

})

describe('auth endpoint with user existence', () => {
     let user;
     let jwt;

     beforeAll(async () => {
          try {
               await db.sequelize.sync({ force: true });
               user = await User.create(basicUser);
               jwt = generatejwt(user.id);
          } catch (error) {
               console.error('Error synchronizing database:', error);
               process.exit(1); // Exit the test suite with a non-zero status code
          }
     });

     afterAll(async () => {
          try {
               await db.sequelize.close();
          } catch (error) {
               process.exit(1);
          }

     });

     test(" GET /api/auth/requestToken -> should get error if the mail is registed", async () => {
          const res = await request(app).post("/api/auth/requestToken")
               .send(registerData);
          expect(res.statusCode).toEqual(403);
     })
     test(" POST api/auth/login -> should login a user", async () => {
          const res = await request(app).post("/api/auth/login")
               .send(loginData)
          expect(res.statusCode).toEqual(200);
     })
     test("POST api/auth/login -> should get error if password wrong", async () => {
          const res = await request(app).post("/api/auth/login")
               .send(wrongLoginData)
          expect(res.statusCode).toEqual(403);

     })
     test("PUT /api/auth/updatePassword -> should change successfully", async () => {
          const jwt = generatejwt(user.id);
          const UnAuthRes = await request(app).put("/api/auth/updatePassword")
               .set('Authorization', `Bearer`)
               .send(passworData)
          expect(UnAuthRes.status).toEqual(401);

          const res = await request(app).put("/api/auth/updatePassword")
               .set('Authorization', `Bearer ${jwt}`)
               .send(passworData)
          expect(res.status).toEqual(200);

          const secondRes = await request(app).put("/api/auth/updatePassword")
               .set('Authorization', `Bearer ${jwt}`)
               .send(passworData)
          expect(secondRes.status).toEqual(403);
     })



     it("PUT /api/auth/resetPassword", async () => {
          const jwt = generatejwt(user.id);
          const unAuthRes = await request(app).put("/api/auth/resetPassword")
               .set('Authorization', `Bearer`)
               .send({
                    password: "12345678"
               })
          expect(unAuthRes.status).toEqual(401);

          const res = await request(app).put("/api/auth/resetPassword")
               .set('Authorization', `Bearer ${jwt}`)
               .send({
                    password: "123456789"
               })
          expect(res.status).toEqual(200);


     })

})
