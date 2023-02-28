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
  const users = seedUsers(4);
  // Generate random thoughts
  const thoughts = seedThoughts(users, 8, 2);
  // console.log(thoughts);


  for (let i = 0; i < users.length; i++) {
    // making the next user a friend to the current user
    if (users.length - 1 === i) {
      users[i].friends.push(users[0]);
    } else {
      users[i].friends.push(users[i+1]);
    }

    // finding the user who made the thought from random generation
    for ( let k = 0; k < thoughts.length; k++) {
      if (thoughts[k].username === users[i].username) {
        users[i].thoughts.push(thoughts[k])
      }
    }
  }

  console.log("========================\n", ...users);
  console.log("========================\n", thoughts);
  const createdUsers = await User.collection.insertMany(users);
  // console.log(users);
  // console.log(createdUsers);
  const createdThoughts = await Thought.collection.insertMany(thoughts);
  // console.log(createdThoughts);

  console.log("Seed data generated and saved to the database");
  process.exit(0)
});
