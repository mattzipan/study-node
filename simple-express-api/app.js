const express = require("express");
const fs = require("fs");

const app = express();
//middleware to tie body to request
app.use(express.json());

// read JSON data synchronously in top level
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));

// start server
const port = 3001;
app.listen(port, () => {
  console.log(`server running on port ${port}..`);
});

//create the api
//GET API
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: tours
  });
});

//POST API
app.post("/api/v1/tours", (req, res) => {
  //temporary while working with local JSON file: creating an id for each new addition
  const newId = tours[tours.length - 1].id + 1;
  console.log(`new id: ${newId}`);
  //merge req.body object with new id
  const newTour = Object.assign({ id: newId }, req.body);
  //add it to data in memory
  tours.push(newTour);

  // write it to file
  fs.writeFile(`${__dirname}/data/data.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    });
  });
});
