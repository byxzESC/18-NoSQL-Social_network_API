const mongoose = require("mongoose");
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      min: 1,
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function() { 
        return moment().format("MMM Do, YYYY at hh:mm a")
      }
    },
    username: {
      type: String,
      require: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { getters: true },
    id: false,
    // timestamps: true,
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

const Thought = mongoose.model("thought", thoughtSchema);

module.exports = Thought;
