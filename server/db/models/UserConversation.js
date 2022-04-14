const db = require("../db");
const User_Conversation = db.define("User_Conversation", {


}, { timestamps: false });

module.exports = User_Conversation;
