const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const keysecret = process.env.SECRET_KEY

const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        vlaidate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    verifytoken:{
        type: String,
    }

});

//hash password
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next()
});

//token generate
userSchema.methods.generateAuthtoken = async function(){
    try {
        let tokenCreate = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });
        this.tokens = this.tokens.concat({ token: tokenCreate });
        await this.save();
        return tokenCreate;
    } catch (error) {
        res.status(400).json(error)
        console.log("token", error)
    }
}
//creating model
const userdb = mongoose.model("userinfos", userSchema)

module.exports = userdb;