require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const app = express();

app.use(cors())
app.use(express.json());
app.listen(3000)

//Initializing project

console.log("Port we are getting : ", process.env.PORT)



