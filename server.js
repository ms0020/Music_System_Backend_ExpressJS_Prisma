import "dotenv/config";

import express from 'express';

const app = express();
const PORT = process.env.PORT || 7000;


// Middleware => For Body Parser for parsing data from json body
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
    return res.send("Hello World!!!")
});

import authenticateToken from "./middleware/authorization.js";
app.use(authenticateToken);

// Routes File
import routes from "./Routes/index.js";
app.use(routes);



app.listen(PORT ,() => console.log(`Server is running on PORT ${PORT}`));