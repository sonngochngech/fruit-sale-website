const request=require("supertest")
const app=require("../server")
const {User,TemporaryToken}=require("../models");
require("dotenv").config();
const{passwordToken,registerToken}=require("./utils/auth.data.test")

describe('auth endpoint',()=>{
     it("should get token ",async()=>{
        const res=await request(app).post("/api/auth/requestToken")
                                    .send(registerToken)
     })
})