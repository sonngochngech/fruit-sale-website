const {body}=require("express-validator")

const createFruitValidator = [
    body('code').notEmpty().withMessage('Code is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('amount').optional().notEmpty().isInt().withMessage('Amount must be a valid integer'),
    body('price').optional().notEmpty().isInt().withMessage('Price must be a valid integer'),
    body('sales').optional().notEmpty().isInt().withMessage('Sales must be a valid integer'),
    body('CategoryId').notEmpty().isInt().withMessage('Category ID must be a valid integer')
  ];


  const updateFruitValidator = [
    body('code').optional().notEmpty().withMessage('Code is required'),
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('description').optional().notEmpty().withMessage('Description is required'),
    body('amount').optional().notEmpty().isInt().withMessage('Amount must be a valid integer'),
    body('price').optional().notEmpty().isInt().withMessage('Price must be a valid integer'),
    body('sales').optional().notEmpty().isInt().withMessage('Sales must be a valid integer'),
    body('CategoryId').optional().notEmpty().isInt().withMessage('Category ID must be a valid integer')
  ];

  module.exports={createFruitValidator,updateFruitValidator}

  