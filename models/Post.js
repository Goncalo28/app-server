const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const postSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},
  {
    timestamps: true
  }
)

module.exports = model("Post", postSchema)
