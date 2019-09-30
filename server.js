const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Frontend Access Control.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
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
const db = require("./config/keys").mongoURI;
mongoose
    .connect(db, dbOpts)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.use('/api/auth', require('./routes/router.auth'));
app.use('/api/user', require('./routes/router.user'));
app.use('/api/item', require('./routes/router.item'));
app.use('/api/order', require('./routes/router.order'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, err => err ? console.log(err) : console.log(`Server is listening to port ${PORT}`));