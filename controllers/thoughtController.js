const { ObjectId } = require("mongoose");
const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__V")
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "thought not found" });
        } else {
          return res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        )
        .then(() => res.status(200).json(thought));
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "thought not found" });
        } else {
          return res.status(200).json(thought);
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "thought not found" });
        } else {
          User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
            .then((user) => {
              return res.status(200).json({ message: "thought deleted", user });
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json(err);
            });
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "thought not found" });
        } else {
          return res.status(200).json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "thought not found" });
        } else {
          return res.status(200).json(thought);
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
