// Initialize express
const express = require('express');
const app = express();
const handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});
// Use "main" as our default layout
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.engine('handlebars', hbs.engine);
// Use handlebars to render
app.set('view engine', 'handlebars');


const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

require('./data/reddit-db');
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Render the "home" layout for the main page and send the following msg

require('./controllers/posts.js')(app);
// app.post('/posts/new', (req, res) => {
//     res.render('post-new');
//   });
// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})