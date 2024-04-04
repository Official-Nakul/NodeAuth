const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const personSchema = mongoose.Schema({
  name: String,
  user_name: String,
  password: String,
});

personSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(person.password, salt);

    person.password = hasPassword;
    next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
});

personSchema.methods.checkPass = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};
const person = mongoose.model("person", personSchema);

module.exports = person;
