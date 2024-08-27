const User = require("../models/user-model")

const userRegisterSchema = {
    username: {
        notEmpty : {
            errorMessage : "Username is Required"
        },
        custom : {
            options : (async (value) => {
                const user =  await User.findOne({username : value})
                if(!user) {
                    return true
                } else {
                    throw new Error("Username already exists")
                }
            })
        },
        trim : true
    },
    email : {
        notEmpty : {
            errorMessage : "Email is Required"
        },
        isEmail : {
            errorMessage : "Email should be in valid format"
        },
        custom : {
            options : (async (value) => {
                const user =  await User.findOne({email : value})
                if(!user) {
                    return true
                } else {
                    throw new Error("Email already exists")
                }
            })
        },
        normalizeEmail : true,
        trim : true
    },
    password : {
        notEmpty : {
            errorMessage : "Password is Required"
        },
        isLength : {
            options : [{min : 8, max : 128}],
            errorMessage: "Password should be in between 8-128 Characters"
        },
        trim : true
    }
}

const userLoginSchema = {
    email : {
        notEmpty : {
            errorMessage : "Email is Required"
        },
        isEmail : {
            errorMessage : "Email should be in valid format"
        },
        normalizeEmail : true,
        trim : true
    },
    password : {
        notEmpty : {
            errorMessage : "Password is Required"
        },
        isLength : {
            options : [{min : 8, max : 128}],
            errorMessage: "Password should be in between 8-128 Characters"
        },
        trim : true
    }
}

module.exports = {
    userRegisterSchema,
    userLoginSchema
}