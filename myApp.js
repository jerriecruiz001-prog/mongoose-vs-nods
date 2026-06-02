// Load environment variables from .env before anything else
require("dotenv").config();

const mongoose = require("mongoose");

// Connect to MongoDB Atlas using the URI stored in .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// ─── Schema & Model ───────────────────────────────────────────────────────────

// Define the Person schema with required name, optional age, and array of foods
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Compile the schema into a Model (this is the class we use to interact with DB)
const Person = mongoose.model("Person", personSchema);

// ─── Create and Save a Single Record ─────────────────────────────────────────

const createAndSavePerson = (done) => {
  // Instantiate a new Person document using the model constructor
  const person = new Person({
    name: "Alice",
    age: 28,
    favoriteFoods: ["pizza", "tacos"],
  });

  // .save() writes the document to MongoDB; callback follows Node error-first pattern
  person.save(function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

// ─── Create Many Records ──────────────────────────────────────────────────────

// Model.create() accepts an array and saves all documents in one call
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

// ─── Find All People with a Given Name ───────────────────────────────────────

// Model.find() returns an array of all documents matching the query object
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

// ─── Find One Person by Favorite Food ────────────────────────────────────────

// Model.findOne() returns the first document that matches; great for unique lookups
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

// ─── Find Person by _id ───────────────────────────────────────────────────────

// Model.findById() is a shortcut for Model.findOne({ _id: id })
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

// ─── Find, Edit (push), then Save ────────────────────────────────────────────

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Step 1: find the person by their _id
  Person.findById(personId, function (err, person) {
    if (err) return done(err);

    // Step 2: push the new food into the favoriteFoods array
    person.favoriteFoods.push(foodToAdd);

    // Step 3: save the modified document back to the database
    person.save(function (err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// ─── Find One and Update ──────────────────────────────────────────────────────

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // { new: true } returns the document AFTER the update is applied (not the old version)
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, updatedDoc) {
      if (err) return done(err);
      done(null, updatedDoc);
    }
  );
};

// ─── Delete One Person by _id ─────────────────────────────────────────────────

const removeById = (personId, done) => {
  // findByIdAndRemove finds the document, removes it, and passes it to the callback
  Person.findByIdAndRemove(personId, function (err, removedDoc) {
    if (err) return done(err);
    done(null, removedDoc);
  });
};

// ─── Delete Many People by Name ───────────────────────────────────────────────

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  // Model.remove() deletes all docs matching the query; returns outcome info, not docs
  Person.remove({ name: nameToRemove }, function (err, result) {
    if (err) return done(err);
    done(null, result);
  });
};

// ─── Chain Query Helpers ──────────────────────────────────────────────────────

const queryChain = (done) => {
  const foodToSearch = "burritos";

  // Chain query helpers: find → sort → limit → select, then execute with .exec()
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })       // sort by name A → Z (ascending)
    .limit(2)                // return at most 2 documents
    .select("-age")          // exclude the age field from the results
    .exec(function (err, data) {
      if (err) return done(err);
      done(null, data);
    });
};

// ─── Exports ──────────────────────────────────────────────────────────────────

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
