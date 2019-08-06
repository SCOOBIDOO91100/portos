const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require ("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use('/', require("./routes/index"));
app.use('/', require("./routes/admin"));

app.listen(port, () => console.log(`le harvey wenstein est là!`));