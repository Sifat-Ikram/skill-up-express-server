const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 4321;

app.get('/', (req, res) => {
    res.send("travel beyond is traveling")
})

app.listen(port, () => {
    console.log(`travel beyond is traveling through port ${port}`);
})