require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors');
const router = express.Router();


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
       useNewUrlParser: true,
       useUnifiedTopology: true
    }
);
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.on('open', () => console.log('Connected to Database'));


app.use(cors());
app.use(express.json());


// Import Routes
const titlesRouter = require('./routes/titles');
const mealsRouter = require('./routes/meals');
const mealTypesRouter = require('./routes/mealTypes');
const menusRouter = require('./routes/menus');
const generalRouter = require('./routes/general');
const userRouter = require('./routes/user');


// Middlewares
app.use('/titles', titlesRouter);
app.use('/types', mealTypesRouter);
app.use('/menus', menusRouter);
app.use('/meals', mealsRouter);
app.use('/general', generalRouter);
app.use('/users', userRouter);


// Route to the documentation
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/documentation/index.html'));
});


app.listen(3000);