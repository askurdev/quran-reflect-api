const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    author: {
      type: "objectId",
      ref: "User",
    },
  },

  { timestamps: true, id: true }
);

const User = model("User", UserSchema);
module.exports = User;
