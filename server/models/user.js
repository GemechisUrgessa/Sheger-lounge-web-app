// Description: User model
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_FACTOR = 10;


// create userSchema with password, phone number, email, fullName, location and role (admin/user)
// each field required and phone number and email unique
// password hashed before saving
// method to compare password
// method to generate token
const userSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: [true, "Email already exists"],

        },
        fullName: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum:["ADMIN", "USER"],
            default: "USER",
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);


// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Generate a salt
  const salt = await bcrypt.genSalt(SALT_FACTOR);
  // Generate a password hash
  const passwordHash = await bcrypt.hash(this.password, salt);
  // Re-assign hashed version
  this.password = passwordHash;
  next();
});

// method compering password
// rehash password and compare with user password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method generate token using jwt
// save token to user
// return token
// return error if token not generated or not saved
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toHexString() }, process.env.ACCESS_TOKEN_KEY).toString();
  user.tokens = user.tokens.concat({ token });
  return user.save().then(() => {
    console.log("token generated");
    return token;
  }).catch((e) => {
    console.log(e)});
};

module.exports = mongoose.model("User", userSchema);
