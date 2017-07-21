var httpProxy = require('http-proxy');
var seaport = require('seaport').connect('localhost', 9090); //[1]
var proxy = httpProxy.createProxyServer({});
var routing = [{
path: '/api',
service: 'api-service',
index: 0
},{
path: '/',
service: 'webapp-service',
index: 0
}];

require('http').createServer(function(req, res) {
    var route;
    routing.some(function(entry) { //[2]
        route = entry;
        //Starts with the route path?
        return req.url.indexOf(route.path) === 0;
    });
    var servers = seaport.query(route.service); //[3]
    if (!servers.length) {
        res.writeHead(502);
        return res.end('Bad gateway');
    }
    route.index = (route.index + 1) % servers.length; //[4]
    proxy.web(req, res, { target: servers[route.index] });
}).listen(8080, function() { console.log('Started'); });