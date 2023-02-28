const connection = require('../config/connection');
const { User, Thought } = require("../models");
const { seedUsers, seedThoughts } = require('./helper')

connection.on("error", (err) => console.error(err));


connection.once("open", async () => {
  console.log("connected to Mongo connection");

  // Remove existing data
  await User.deleteMany({});
  await Thought.deleteMany({});
  
  // Generate random users
  const users = seedUsers(10);

  const createdUsers = await User.collection.insertMany(users);
  console.log(createdUsers);

  // Generate random thoughts
  const thoughts = seedThoughts(users, 10, 3);


  const createdThoughts = await Thought.collection.insertMany(thoughts);
  console.log(createdThoughts);

  console.log("Seed data generated and saved to the database");
  process.exit(0)
});
