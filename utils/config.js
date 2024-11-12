require("dotenv").config();

const Mongodb_URL = process.env.Mongodb_URL;
const Port = process.env.Port;
const JWT_Secret = process.env.JWT_Secret;

module.exports = ({Mongodb_URL,Port,JWT_Secret});