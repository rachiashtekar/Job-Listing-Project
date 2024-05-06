const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/database')
const AuthRoute = require('./Routes/AuthRoute')
const jobRoute = require ('./Routes/jobRoute')
const cors = require('cors');

const app = express()



//configure env
dotenv.config()

//middleware
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/job",jobRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//PORT
const PORT = process.env.PORT || 3002;



//database config
connectDB();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})