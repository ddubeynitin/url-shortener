const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/',(req, res) => {
    res.send("This is root route!");
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});