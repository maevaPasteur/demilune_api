require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
       useNewUrlParser: true,
       useUnifiedTopology: true
    }
);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.on('open', () => console.log('Connected to Database'));


app.use(express.json());


// Import Routes
const pagesRouter = require('./routes/pages');
const titlesRouter = require('./routes/titles');
const mealsRouter = require('./routes/meals');
const mealTypesRouter = require('./routes/mealTypes');
const menusRouter = require('./routes/menus');
const componentsRouter = require('./routes/components');
const generalRouter = require('./routes/general');


// Middlewares
app.use('/pages', pagesRouter);
app.use('/titles', titlesRouter);
app.use('/types', mealTypesRouter);
app.use('/menus', menusRouter);
app.use('/components', componentsRouter);
app.use('/meals', mealsRouter);
app.use('/general', generalRouter);


app.listen(3000);