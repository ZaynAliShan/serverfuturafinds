const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    required: [true, "Please provide user name"],
  },
  email: {
    type: String,
    required: [true, "Please provide user email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  password: {
    type: String,
    minlength: 5,
    required: [true, "Please provide user password"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function (canidatePassword) {
  const comparedPassword = await bcrypt.compare(
    canidatePassword,
    this.password
  );
  return comparedPassword;
};

UserSchema.methods.createToken = (userToken) => {
  const token = jwt.sign(userToken, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

UserSchema.methods.sendCookies = (res, token) => {
  const oneDay = 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: false,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
};

module.exports = mongoose.model("User", UserSchema);
