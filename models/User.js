const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  connections: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  bio: String,
  typeOfUser: {
    type: String,
    required: true,
    enum: ['Investor', 'Innovator']
  }
},
  {
    timestamps: true
  }
)

module.exports = model("User", userSchema)
