const { faker } = require("@faker-js/faker");
const { User, Thought } = require("../models");

const randomUser = (users) => {
  let index = Math.floor(Math.random() * users.length);
  return index;
};

const randomReaction = (numOfReactions, users) => {
  // Generate random reactions
  const reactions = [];
  for (let i = 0; i < numOfReactions; i++) {
    reactions.push({
      reactionBody: faker.lorem.sentence(),
      username: users[randomUser(users)].username,
      createdAt: faker.date.past(),
    });
  }
  return reactions;
};

const seedUsers = (num) => {
  let result = [];
  for (let i = 0; i < num; i++) {
    const user = new User({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      thoughts: [],
      friends: [],
    });
    result.push(user);
  }
  return result;
};

const seedThoughts = (usersArray, numOfThoughts, numOfReactions) => {
  let result = [];
  // console.log(usersArray)
  for (let i = 0; i < numOfThoughts * 3; i++) {
    const thought = new Thought({
      thoughtText: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      username: usersArray[randomUser(usersArray)].username,
      reactions: randomReaction(numOfReactions, usersArray),
    });
    // console.log('------\n', thought)
    result.push(thought);
  } 
  return result;
};

module.exports = { randomUser, randomReaction, seedUsers, seedThoughts };
