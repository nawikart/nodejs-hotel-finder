// dependencies
const express = require("express"),
    path = require("path"),
    config = require("config");

// config
let env = process.env.NODE_ENV || "production",
    port = config.get("port");

// Express Setup
let app = express();
app.set("port", port);

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

app.use(express.static('public'))

// Use Middleware
app.use(require("./middleware/cors"))

// Use Routes
app.use(require("./app/controllers/index"));
app.use(require("./app/controllers/admin"));

// Serve Static Assets 
// app.use(express.static(path.join(__dirname, "dist"))); //serve static assets

// Start Express Server
var server = app.listen(app.get("port"), function() {
    var port = server.address().port;
    console.log("Magic happens on port " + port);
});

