const express = require('express');
const mongoose = require('mongoose');
const PROPERTIES = require("./config/keys");

const app = express();

//Frontend Access Control.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", PROPERTIES.origin);
    res.header("Access-Control-Allow-Headers", PROPERTIES.headers);
    res.header("Access-Control-Allow-Methods", PROPERTIES.methods);
    next();
});

app.use(express.json());

//Database Options.
const dbOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

//Database Connection.
mongoose
    .connect(PROPERTIES.mongoURI, dbOpts)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

//Routes
app.use('/api/auth', require('./routes/router.auth'));
app.use('/api/user', require('./routes/router.user'));
app.use('/api/item', require('./routes/router.item'));
app.use('/api/order', require('./routes/router.order'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, err => err ? console.log(err) : console.log(`Server is listening to port ${PORT}`));