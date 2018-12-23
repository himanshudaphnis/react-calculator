import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

function requestHandler(request, response) {
    let requestedResource = path.join(
        __dirname,
        '../public',
        url.parse(request.url).pathname
    );
    fs.exists(requestedResoruce, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;

        }

        if(fs.statSync(requestResource).isDirectory()) {
            requestResponse +='/index.html';
        }

        fs.readFile(
            requestResource,
            "binary",
            function(err, file) {
                if(err) {
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write(err+'\n');
                    response.end();
                    return;
                }

                const contentTypeByExtension  = {
                    '.html': "text/html",
                    '.css': "text/css",
                    '.js': "text/javascript"
                };

                const headers = {};
                const contentType = contentTypeByExtension[
                    path.extname(requestResource)
                ];
                if(contentType) {
                    headers["Content-Type"] = contentType;
                }

                response.writeHead(200, headers);
                response.write(file, 'binary');
                response.end();
            });
    });
}