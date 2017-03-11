const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

//types of extension which we are using i our project
const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

http.createServer(function (req, res) {
 

    console.log('req 1 : ' + req.url.toString());
    var uri = url.parse(req.url).pathname;

    console.log('uri ' + JSON.stringify(uri));

    var fileName = path.join(process.cwd(), unescape(uri));
    console.log('fileName : ' + fileName);
    var stats;
    try {
        stats = fs.lstatSync(fileName);
        console.log('stats : ' + JSON.stringify(stats));
    } catch (e) {
        console.log('e', e);
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found \n');
        res.end();
        return;
    }

    if (stats.isFile()) {
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        console.log('mimeType : ' + JSON.stringify(mimeType));
        res.writeHead(200, {'Content-type': mimeType});
        var fileStream = fs.createReadStream(fileName);

        console.log('fileStream : ' + JSON.stringify(fileStream));
        fileStream.pipe(res);


    } else if (stats.isDirectory()) {
        console.log('Location : ');
        res.writeHead(302, {
            'Location': 'about.html'
        })
        res.end();

    } else {
        res.writeHead(500, {'Content-type': 'text/plain'});
        res.write('500 Internal Error\n');
        res.end();
    }


}).listen(8000)
console.log('connecting server at : 8000')

