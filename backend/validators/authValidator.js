const {body}=require("express-validator")

const signUpValidator=[
    body('email').notEmpty().isEmail().withMessage('Email is required and must be a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    body('firstname').notEmpty().withMessage('First name is required'),
    body('lastname').notEmpty().withMessage('Last name is required'),
    body('mobile').notEmpty().isMobilePhone().withMessage('Mobile number is required and must be a valid phone number'),
    body('token').notEmpty().withMessage('Token must not be empty')

]

const loginValidator=[
    body('email').notEmpty().isEmail().withMessage('Email is required and must be a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
]

const requestTokenValidator=[
    body('email').notEmpty().isEmail().withMessage('Email is required and must be a valid email address'),
    body('type').notEmpty().withMessage('Type is required'),
]
module.exports={signUpValidator,loginValidator,requestTokenValidator}

