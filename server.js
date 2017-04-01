const express = require('express');
// const httpProxy = require('http-proxy')
const fs = require('fs');
const routes = require('./controller/routes');
const api_routes = require('./api/routes');
const app = express();

// const targetUrl = `http://$localhost:3001`;

// const proxy = httpProxy.createProxyServer({
    // target: targetUrl,
    // ws: true,
// })
app.set('port', 3001);
// app.set('port', (process.env.PORT || 3001));


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// app.use('/', routes);

// app.use('/api', (req, res) =>{
//     proxy.web(req, res, {target: `${targetUrl}/api`});
// })

app.use('/api', api_routes);

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

