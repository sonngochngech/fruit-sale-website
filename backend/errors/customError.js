class CustomerError extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
      }
}

const createCustomerError=(message,statusCode)=>{
    return new CustomerError(message,statusCode)
}

module.exports={CustomerError,createCustomerError}