const { body } = require("express-validator");

const createOrderValidator = [
    body('fruitIds').notEmpty().withMessage('The fruits are required'),
    body('title').notEmpty().withMessage('Title is required.'),
    body('phoneNo').notEmpty().withMessage('Phone number is required.'),
    body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email format.'),
    body('address').notEmpty().withMessage('Address is required.'),
    body('productCost').notEmpty().withMessage('Product cost is required.').isInt({ min: 0 }).withMessage('Product cost must be a non-negative integer.'),
    body('shippingCost').notEmpty().withMessage('Shipping cost is required.').isInt({ min: 0 }).withMessage('Shipping cost must be a non-negative integer.')
];

const updateOrderValidator=[
    body('title').optional().notEmpty().withMessage('Title is required.'),
    body('phoneNo').optional().notEmpty().withMessage('Phone number is required.'),
    body('email').optional().notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email format.'),
    body('address').optional().notEmpty().withMessage('Address is required.')

]
module.exports = {createOrderValidator,updateOrderValidator};