const express = require('express');
const DBconnect = require('./config/DBconnection');
const errorHandler = require('./middleware/errorHandler');
const contactsRoutes = require('./routes/contact.route');
const usersRoutes = require('./routes/user.route');
const dotenv = require("dotenv").config();

DBconnect();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/contacts", contactsRoutes);
app.use("/api/users", usersRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});