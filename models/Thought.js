const Mongoose = require('mongoose');

const thoughtSchema = new mongoose.schema({
    thoughtText: {
        type: String,
        require: true,
        min: 1,
        max: 280
    },
    createAt: {
        type: Date,
        
    }
})