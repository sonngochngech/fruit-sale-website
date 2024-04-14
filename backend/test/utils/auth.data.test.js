const passwordToken={
    email: "nguyenhongson159stk@gmail.com",
    type: "PASSWORD"
}
const registerData={
    email: "nguyenhongson159stk@gmail.com",
    type: "REGISTER"
}
const unexistedData={
    email: "nguyenhongson15999999stk@gmail.com",
    type: "REGISTER"
}



const registerUser ={
    email:"nguyenhongson159stk@gmail.com",
    password:"12345678",
    firstname:"son",
    lastname:"nguyen",
    mobile:"0123456789",
}
const loginData={
    email:"nguyenhongson159stk@gmail.com",
    password:"12345678"
}
const wrongLoginData={
    email:"nguyenhongson159stk@gmail.com",
    password:"123456789"

}
const basicUser={
    email:"nguyenhongson159stk@gmail.com",
    password:"$2b$10$h27/Dqg1zS0ytqAVItLJT..opgqOT6e2Vas8ifcwZWc48f9wqQ4v6", //12345678
    firstName:"son",
    lastName:"nguyen",
    phoneNo:"0123456789",
    role:"Customer"
}
const admin={
    email:"nguyenhongson159stk@gmail.com",
    password:"$2b$10$h27/Dqg1zS0ytqAVItLJT..opgqOT6e2Vas8ifcwZWc48f9wqQ4v6", //12345678
    firstName:"son",
    lastName:"nguyen",
    phoneNo:"0123456789",
    role:"Admin"

}
const sufficientAttributeUserSate={
    email:"nguyenhongson159stk@gmail.com",
    password:"$2b$10$h27/Dqg1zS0ytqAVItLJT..opgqOT6e2Vas8ifcwZWc48f9wqQ4v6", //12345678
    lastName:"nguyen",
    phoneNo:"0123456789",
    role:"Customer"
}

const passworData={
    oldPassword:"12345678",
    newPassword:"123456789"
}


module.exports={passwordToken,registerData,registerUser,basicUser,loginData,wrongLoginData,sufficientAttributeUserSate,unexistedData,passworData,admin}