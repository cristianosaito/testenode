const app = require('./config/express')();

const PORT = process.env.PORT || 3001

app.get('/', function (req, res) {
    res.send('Server is ready!');
});

app.listen(PORT, () => {
    console.log('The server is running on the port, ' + PORT + '!');
});