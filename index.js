
const path = require('path');
const express = require("express");
let jobsList = require("./jobs.json");
const { append } = require('express/lib/response');

const app = express();

app.get("/jobCategories", (req, res) => {

  let categories = {};

  for (let j in jobsList) {

    for (let c of jobsList[j].categories) {
      
      if (!categories[c]) categories[c] = 1;
      
      else categories[c]++;
    }
  }

  res.json(categories);
});

app.get('/JobsByCity', (req, res) => {

    let foundJobs = [];

    let city = req.query.city;

    for (const prop in jobsList) 
    {
        let cityString = jobsList[prop].title;

        if (cityString.search(city) !== -1) 
        {
            foundJobs.push(prop);
        }
    }
    
    res.send(foundJobs)

app.get("/:category", (req, res) => {
  
  let jobs = [];

  for (let j in jobsList) {
    
    if (jobsList[j].categories.includes(req.params.category)) jobs.push(j);
  }

  res.json({ jobs: jobs });
});

app.listen(80);
