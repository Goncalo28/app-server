const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const connectionSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},
  {
    timestamps: true
  }
)

module.exports = model("Connection", connectionSchema)
