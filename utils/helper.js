const faker = require("faker");
const { User, Thought } = require("../models");

const randomUser = (users) => {
  let user = Math.floor(Math.random() * users.length);
  return user.username;
};

const randomReaction = (numOfReactions, users) => {
  // Generate random reactions
  const reactions = [];
  for (let i = 0; i < numOfReactions; i++) {
    reactions.push({
      reactionBody: faker.lorem.sentence(),
      username: randomUser(users),
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
  for (let i = 0; i < numOfThoughts * 3; i++) {
    const thought = new Thought({
      thoughtText: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      username: randomUser(usersArray),
      reactions: randomReaction(numOfReactions, usersArray),
    });
    result.push(thought);
  }
  return result;
};
module.exports = { randomUser, randomReaction, seedUsers, seedThoughts };
