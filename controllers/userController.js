const { ObjectId } = require("mongoose");
const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
    .populate({
      path: "thoughts",
      select: "-__v -username -createdAt",
    })
    .populate({
      path: "friends",
      select: "-__v",
    })
      .then((userData) => {
        return res.json(userData);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json(err);
      });
  },

  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      // .select("-__V")
      .populate({
        path: "thoughts",
        select: "-__v",
        populate: {
          path: "reactions",
          select: "-_id",
        },
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        } else {
          return res.json(user);
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "user not found" });
        } else {
          return res.status(200).json(user);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser(req, res) {
    User.findByIdAndRemove({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "user not found" });
        } else {
          // BONUS: Fulfilling the following can add 10 points to your grade.
          // Application deletes a user's associated thoughts when the user is deleted.
          return Thought.deleteMany({ _id: { $in: user.thoughts } });
        }
      })
      .then(() => {
        res.json({ message: "user associate with the id been deleted" });
      });
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId},
      { $push: { friends: req.body  } },
      { runValidators: true, new: true }
    )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      } else {
        return res.status(200).json(user);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  removeFriend(req, res) {

    // console.log(req.params.userId, friendToDelete)
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { _id: req.params.friendId }  } },
      { runValidators: true, new: true }
    )
    .then((user) => {
      // console.log(user)
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      } else {
        res.status(200).json(user)
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  }
};
