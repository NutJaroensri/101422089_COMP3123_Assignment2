const express = require('express')
const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const mongoose = require('mongoose')
//const DB_CONNECTION_STRING = "mongodb+srv://enyouthree:0807989870Db@cluster0.f2ocl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const DB_CONNECTION_STRING = "mongodb://mongodb:27017/mydatabase";

// connect to MongoDB
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error: ", err)
})

// Create an express app instance
const app = express()
const SERVER_PORT = process.env.PORT || 3000;

// Parse incoming JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/emp', employeeRoutes)

// Start the server
app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
});