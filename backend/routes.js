const AuthController=require("./controllers/authController")
const AuthMiddleware = require("./middlewares/authMiddleware")
const ImageMiddleware=require("./middlewares/imageMiddleware")
const FruitController=require("./controllers/fruitController")
const OrderController=require("./controllers/orderController")
const CategoryController=require("./controllers/categoryController")
const cartController=require("./controllers/shoppingCartController")
const notiController=require("./controllers/notificationController")
const AuthValidator=require("./validators/authValidator")
const FruitValidator=require("./validators/fruitValidator")
const OrderValidator=require("./validators/orderValidator")

const express = require("express");
const router = express.Router();

    

    //auth api 
    router.post("/api/auth/register",AuthValidator.signUpValidator,AuthController.register);

    router.post("/api/auth/login",AuthValidator.loginValidator,AuthController.login);

    router.post("/api/auth/requestToken",AuthValidator.requestTokenValidator,AuthController.sendToken);

    router.put("/api/auth/updatePassword",AuthMiddleware.isAuthenticated,AuthController.updatePassword);

    router.put("/api/auth/resetPassword",AuthMiddleware.isAuthenticated,AuthController.resetPassword);

    router.post("/api/auth/verifyPasswordToken",AuthController.verifyPasswordToken);


    //product API 
    router.get("/api/fruits",FruitController.getAllFruits);

    router.get("/api/fruits/search",FruitController.searchFruit);

    router.get("/api/fruits/filter",FruitController.filterFruit);

    router.get("/api/fruits/searchByCategory",FruitController.getFruitsByCategory);

    router.get("/api/fruits/:fruitId",FruitController.getFruit);

    router.post("/api/fruits/create",AuthMiddleware.isAuthenticated,ImageMiddleware.uploadFruitImage,FruitValidator.createFruitValidator, FruitController.createFruit);

    router.delete("/api/fruits/:fruitId/delete",AuthMiddleware.isAuthenticated,AuthMiddleware.isAdmin,FruitController.deleteFruit);

    router.put("/api/fruits/:fruitId/updateInf",AuthMiddleware.isAuthenticated,AuthMiddleware.isAdmin,FruitValidator.updateFruitValidator,FruitController.updateFruitInf);

    router.post("/api/fruits/:fruitId/add-image",AuthMiddleware.isAuthenticated,AuthMiddleware.isAdmin,ImageMiddleware.uploadFruitImage,FruitController.addFruitImages);

    router.post("/api/fruits/:fruitId/delete-image",AuthMiddleware.isAuthenticated,AuthMiddleware.isAdmin,FruitController.deleteFruitImages);


    //categoryAPI 
    router.get("/api/categories",CategoryController.getCategories);

    router.post("/api/categories/create",AuthMiddleware.isAuthenticated,AuthMiddleware.isAdmin,CategoryController.createCategory);

    router.delete("/api/categories/:categoryId/delete",AuthMiddleware.isAuthenticated,AuthMiddleware.isAdmin,CategoryController.deleteCategory);


    //order API
    router.get("/api/orders/getUserOrderList",AuthMiddleware.isAuthenticated,OrderController.getUserOrderList);

    router.get("/api/orders/getAllOrders",AuthMiddleware.isAuthenticated,AuthMiddleware.isAdmin,OrderController.getAllOrders);

    router. get("/api/orders/search",AuthMiddleware.isAuthenticated,AuthMiddleware.isAdmin,OrderController.searchOrders);

    router.post("/api/orders/create",AuthMiddleware.isAuthenticated,OrderValidator.createOrderValidator,OrderController.createOrder);

    router.put("/api/orders/:orderId/update",AuthMiddleware.isAuthenticated,AuthMiddleware.isOrderOwner,OrderValidator.updateOrderValidator,OrderController.updateBasicInformationOrder);

    router.get("/api/orders/:orderId",AuthMiddleware.isAuthenticated,AuthMiddleware.isOrderOwner,OrderController.getOrder);

    router.put("/api/orders/:orderId/changeStatus",AuthMiddleware.isAuthenticated,AuthMiddleware.isOrderOwner,OrderController.updateStatusOrder);

    router.delete("/api/order/:orderId/delete",AuthMiddleware.isAuthenticated,AuthMiddleware.isAdmin,OrderController.deleteOrder);


    //cart API 

    router.post("/api/carts/add",AuthMiddleware.isAuthenticated,cartController.addFruitToCart);
    router.delete("/api/carts/remove",AuthMiddleware.isAuthenticated,cartController.removeFruitInCart);
    router.get("/api/carts",AuthMiddleware.isAuthenticated,cartController.getFruitsInCart);
    router.put("/api/carts/update",AuthMiddleware.isAuthenticated,cartController.updateCart);

    //notification API 
    router.get("/api/notifications",AuthMiddleware.isAuthenticated,notiController.getNotification);
    router.get("/api/noitifications/unread",AuthMiddleware.isAuthenticated,notiController.getUnreadNoti);
    router.delete("/api/notifications/deleteAll",AuthMiddleware.isAuthenticated,notiController.deleteAllNotifications);
    router.get("/api/notifications/:notiId/setIsRead",AuthMiddleware.isAuthenticated,AuthMiddleware.isNotiOwner,notiController.updateIsRead);
    router.delete("/api/notifications/:notiId/delete",AuthMiddleware.isAuthenticated,AuthMiddleware.isNotiOwner,notiController.deleteNotification);
 
    


    

module.exports=router;