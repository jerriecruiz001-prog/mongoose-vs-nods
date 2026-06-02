# Mongoose Checkpoint

A Node.js project demonstrating MongoDB database management using Mongoose. Covers schema creation, CRUD operations, and query chaining.

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root and add your MongoDB Atlas URI:
   ```
   MONGO_URI='your-mongodb-atlas-uri-here'
   ```
4. Run the app:
   ```bash
   npm start
   ```

## What's Covered

| Function | Description |
|---|---|
| `createAndSavePerson` | Creates and saves a single Person document |
| `createManyPeople` | Seeds the DB with multiple people at once |
| `findPeopleByName` | Finds all people matching a given name |
| `findOneByFood` | Finds one person by a favorite food |
| `findPersonById` | Finds a person by their MongoDB `_id` |
| `findEditThenSave` | Finds a person, adds "hamburger" to their foods, saves |
| `findAndUpdate` | Updates a person's age to 20 by name |
| `removeById` | Deletes one person by `_id` |
| `removeManyPeople` | Deletes all people named "Mary" |
| `queryChain` | Finds burrito lovers, sorted by name, limited to 2, age hidden |

## Person Schema

```js
{
  name: String (required),
  age: Number,
  favoriteFoods: [String]
}
```

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Mongoose](https://mongoosejs.com/) v6
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [dotenv](https://www.npmjs.com/package/dotenv)
