const http = require("http");
const fs = require("fs");
const url = require("url");

// this top level code will only run when the application is started. Hence the data is only red once.
// read json data
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");

//create server
//the server code runs each time a request is coming in. SO it will serve the red data. Thats why the data reading should not be part of this block for efficiency reasons
const server = http.createServer((req, res) => {
  // read the json data
  const pathname = req.url;
  if (pathname === "/api") {
    // let the client know were sending json
    res.writeHead("200", {
      "Content-type": "application/json"
    });
    //this returns a normal json object
    res.end(data);
  }
});

//let server listen
server.listen(8000, () => console.log("listening on port 8000.."));
