const express = require("express");
const router = express.Router();
const Person = require("./../Model/PersonModel");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const person = new Person(data);
    const response = await person.save();

    console.log("Data saved");
    res.send(response);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.get("/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const response = await Person.find({ user_name: user });
    if (response.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(response);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});
router.get("/", async (req, res) => {
  const response = await Person.find();
  res.status(200).send(response);
});
module.exports = router;
