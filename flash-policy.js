// Flash Socket Policy Server
// Copyright 2014 One Fold Media
// MIT License

var net = require('net');

var server = net.createServer(handler);
var port = process.env.PORT ||  843;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

function handler (socket) {
     socket.setEncoding("utf8");
 
     socket.write(xmlPolicy() + '\0');
 
     function policy_check(data) {
          socket.removeListener('data', policy_check); 
          try {
               if(data == '<policy-file-request/>\0') {
                    socket.write(xmlPolicy());
					socket.end();
               }
          } catch (ex) {
               console.log(ex);
          }
     }
 
     socket.on('data', policy_check);
 
     socket.on("error", function (exception) {
          socket.end();
     });
     socket.on("timeout", function () {
          socket.end();
     });
     socket.on("close", function (had_error) {
          socket.end();
     });
}
 
function xmlPolicy() {
     var policy = '<?xml version="1.0"?>\n<!DOCTYPE cross-domain-policy SYSTEM'
     policy += ' "http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">';
     policy += '\n<cross-domain-policy>\n';
     policy += '<allow-access-from domain="*" to-ports="*"/>\n';
     policy += '</cross-domain-policy>\n';
     return policy;
}