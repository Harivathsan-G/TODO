const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordcomplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "7d" }
  );
  return token;
};

const validate = (user) => {
  const schema = joi.object({
    name: joi.string().min(5).max(10).required(),
    email: joi.string().email().required(),
    password: passwordcomplexity().required(),
  });
  return schema.validate(user);
};

const User = mongoose.model("user", userSchema);

module.exports = { User, validate };
