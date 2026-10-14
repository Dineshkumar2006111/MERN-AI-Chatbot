const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')

app.use(cors())
app.use(express.json())
dotenv.config()

const chatroute = require('./routes/chat');
app.use('/api/chat',chatroute);


app.listen(8000,()=>{
    console.log(`Server is running on the port 8000`)
})