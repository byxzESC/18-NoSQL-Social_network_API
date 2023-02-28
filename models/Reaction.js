const mongoose = require('mongoose');
const moment = require('moment');

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function() { 
        return moment().format("MMM Do, YYYY at hh:mm a")
      }
    },
  },
  {
    toJSON: { getters: true },
    id: false,
    // timestamps: true,
  }
);

module.exports = reactionSchema;