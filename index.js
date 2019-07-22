const server = require('./server');

const port = process.env.PORT || 4300;

server.listen(port, () => console.log(`server is up and running on ${port} `))