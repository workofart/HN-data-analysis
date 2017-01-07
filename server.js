const express = require('express');
const fs = require('fs');
const routes = require('./controller/routes');
const api_routes = require('./api/routes');
const app = express();

app.set('port', (process.env.PORT || 3001));


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// app.use('/', routes);

app.use('/api', api_routes);

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

