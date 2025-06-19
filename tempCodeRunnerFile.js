const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const app = express();
const env = require("dotenv").config();

app.use(cors())
app.use(express.json());

console.log("Port we are getting : ", process.env.PORT)


