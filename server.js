const express = require('express');
const port = process.env.PORT || 4040;
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/db').uri;
const productRoute = require('./routes/productRoute');

dotenv.config();

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongo Database successfully connected"))
.catch(err => console.log(err));
app.use(express.json())
app.use(cors({
    origin: '*'
}));
app.use(cors());

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Api is running');
});

app.use('/api', productRoute);

app.listen(port, console.log(`Server / Api running on port ${port}`));