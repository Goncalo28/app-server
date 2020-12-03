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
    require: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  post: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  connections: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  pending: [{
    type: Schema.Types.ObjectId,
    ref: 'Connection'
  }],
  bio: String,
  type: {

  }
},
  {
    timestamps: true
  }
)

module.exports = model("User", userSchema)
