const express = require("express");
const app = express();
const personRoute = require("./Routers/personRoute");
const bodyParser = require("body-parser");
const db = require("./db");
const passport = require("passport");
const Person = require("./Model/PersonModel");
const localStratagy = require("passport-local").Strategy;
app.use(bodyParser.json());

passport.use(
  new localStratagy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ user_name: username });
      //   console.log(username, user);
      if (!user) {
        return done(null, false);
      }

      const passMatch = await user.checkPass(password);
      if (passMatch) {
        return done(null, user);
      } else {
        return done(null, false, { msg: "Wrong password" });
      }
    } catch (e) {
      console.log(e);
      return done(e);
    }
  })
);

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Yo! whatsup");
});
app.use(
  "/person",
  passport.authenticate("local", { session: false }),
  personRoute
);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
