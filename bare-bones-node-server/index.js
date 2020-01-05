const fs = require("fs");
const http = require("http");
const url = require("url");

//set server response
const server = http.createServer((req, res) => {
  //configure simple routing
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview")
    res.end("This is the overview!");
  if (pathName === "/product") res.end("This is the product!");
  else {
    // sending 404 response
    res.writeHead(404, {
      "Content-type": "text/html",
      // adding an own custom response header
      "my-own-header": "hellow-world"
    });
    res.end("<h1>Page not found :(</h1>");
  }
});

// set server to listen on port 8000
// localhost ip definiton is optional, and callback too
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000...");
});
