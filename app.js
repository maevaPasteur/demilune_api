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
const mealsRouter = require('./routes/meals');
const mealTypesRouter = require('./routes/mealTypes');
const menusRouter = require('./routes/menus');
const generalRouter = require('./routes/general');
const userRouter = require('./routes/user');
const pageRouter = require('./routes/pages');


// Middlewares
app.use('/types', mealTypesRouter);
app.use('/menus', menusRouter);
app.use('/meals', mealsRouter);
app.use('/general', generalRouter);
app.use('/users', userRouter);
app.use('/pages', pageRouter);


// Route to the documentation
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/documentation/index.html'));
});


app.listen(3000);