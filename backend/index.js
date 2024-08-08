const connectToMongo=require("./db");
const express = require('express');
var cors = require('cors')

connectToMongo.connect();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())// middleware

app.use('/api/auth',require('./routes/auth'));
app.use('/api/nodes',require('./routes/nodes'));

app.listen(port, () => {
  console.log(`iNotebook backend listening on http://localhost:${port}`)
})

//npm run dev