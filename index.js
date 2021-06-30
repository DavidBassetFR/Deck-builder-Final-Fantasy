const dotenv = require('dotenv');
const express = require('express');
dotenv.config();

const PORT = process.env.PORT || 1234;
const router = require('./app/router');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static(__dirname + '/public'))
app.use(session({
  secret: 'mon super password secret', // password qui permet d'encoder nos cookies (seule option required)
}))
app.use((req, res, next) => {
  // on définit une variable, au départ nulle.
 
 
  res.locals.decklist = req.session.decklist
  
 
  // on passe à la methode suivant;
  next();
})

app.use(router);

app.use((request, response) => {
  response.status(404);
  response.send('404 T\'es perdu ');
});

app.listen(PORT, () => {
  console.log(`App on ${PORT}`)
});
