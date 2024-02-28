// Create Web Server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];
var server = http.createServer(function(req, res){
	// Get the file path
	var filePath = '.' + req.url;
	// If the file path is root, get index.html
	if(filePath == './'){
		filePath = './index.html';
	}
	// Get the file extension
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	// Set the content type based on the extension
	switch(extname){
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
	}
	// Read the file
	fs.readFile(filePath, function(error, content){
		if(error){
			if(error.code == 'ENOENT'){
				fs.readFile('./404.html', function(error, content){
					res.writeHead(200, {'Content-Type': contentType});
					res.end(content, 'utf-8');
				});
			}
			else{
				res.writeHead(500);
				res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
				res.end();
			}
		}
		else{
			res.writeHead(200, {'Content-Type': contentType});
			res.end(content, 'utf-8');
		}
	});
});
// Create a WebSocket server
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	// On connection, send comments to the client
	socket.emit('update', comments);
	// When a comment is added
	socket.on('add', function(data){
		// Add the comment to the comments array
		comments.push(data);
		// Send the comments array to the client
		io.sockets.emit('update', comments);
	});
});
// Listen on port 8000
server.listen(8000);
console.log('Server running at http://