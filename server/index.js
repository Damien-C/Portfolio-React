const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/route');

const app = express();
const port = process.env.PORT || 5001;

app.use('/api', api);
app.use(express.static(__dirname + '/src'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
	console.log('Express listening on port', port);
});