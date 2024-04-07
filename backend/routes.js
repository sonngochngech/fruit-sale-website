const AuthController=require("./controllers/authController")
const AuthMiddleware = require("./middlewares/authMiddleware")
const ImageMiddleware=require("./middlewares/imageMiddleware")
const FruitController=require("./controllers/fruitController")
const OrderController=require("./controllers/orderController")
const express = require("express");
const router = express.Router();

    

    //auth api 
    router.post("/api/auth/register",AuthController.register);
    router.post("/api/auth/login",AuthController.login);
    router.post("/api/auth/requestToken",AuthController.sendToken);
    router.put("/api/auth/updatePassword",AuthMiddleware.isAuthenticated,AuthController.updatePassword);
    router.put("/api/auth/resetPassword",AuthMiddleware.isAuthenticated,AuthController.resetPassword);
    router.post("/api/auth/verifyPasswordToken",AuthController.verifyPasswordToken);


    //product API 
    router.get("/api/fruits",FruitController.getAllFruits);
    router.get("/api/fruits/:fruitId",FruitController.getFruit);
    router.post("/api/fruits/create",ImageMiddleware.uploadFruitImage,FruitController.createFruit);
    router.delete("/api/fruits/:fruitId/delete",FruitController.deleteFruit);
    router.put("/api/fruits/:fruitId/updateInf",FruitController.updateFruitInf);
    router.post("/api/fruits/:fruitId/add-image",ImageMiddleware.uploadFruitImage,FruitController.addFruitImages);
    router.post("/api/fruits/:fruitId/delete-image",FruitController.deleteFruitImages);
    router.get("/api/fruits/search",FruitController.searchFruit);
    router.get("/api/fruits/filter",FruitController.filterFruit);

    //order API
    router.post("/api/orders/create",AuthMiddleware.isAuthenticated,OrderController.createOrder);
    router.put("/api/orders/:orderId/update",OrderController.updateBasicInformationOrder);
    // router.get("/api/orders/:orderId",OrderController.getOrder);
    // router.get("/api/orders/getOrderList",AuthMiddleware.isAuthenticated,OrderController.getOrderList);
    // router.get("/api/orders/getAllOrders",AuthMiddleware.isAdmin,OrderController.getAllOrders);
    

module.exports=router;