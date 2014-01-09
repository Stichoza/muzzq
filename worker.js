/*
 * web node for heroku
 */
var http	= require('http'),
	express	= require('express'),
	socket	= require('socket.io'),
	app		= express(),
	port	= process.env.PORT || 5000,
	server	= http.createServer(app);

app.use(express.static(__dirname + '/frontend/'));
server.listen(port);
console.log('listening: ' + port);