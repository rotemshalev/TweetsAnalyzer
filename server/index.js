const Express = require('express');
const Cors = require("cors");

const twitterApi = require("./twitterApi").router;
const config = require('../config');
const app = Express();

app.use(Cors(['*']));
app.use('/tweets', twitterApi);

app.get('/', (req, res) => {
  res.send("Backend Service");
})

app.listen(config.port, () => console.log('App is listening on port -> ' + config.port));

