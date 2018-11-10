"use strict";

const
  express = require("express"),
  fs = require("fs"),
  path = require("path"),
  judger = require("./judger");

const
  port = process.env.npm_package_config_apiPort,
  archivePath = path.resolve("problems");

const
  app = express();

app.use(express.json());

app.get("/api/archive", (request, response) => {
  response.type("json");
  fs.readdir(archivePath, (error, data) => {
    let promises = [];
    data.forEach((item) => {
      promises.push(new Promise((resolve, reject) => {
        let stat = fs.lstat(path.join(archivePath, item), (error, stats) => {
          if (error) reject(error);
          else resolve(stats);
        });
      }));
    });
    Promise.all(promises).then((values) => {
      let result = [];
      for (let i = 0; i < data.length; i++) {
        if (values[i].isDirectory()) result.push(data[i]);
      }
      response.set({
        'Access-Control-Allow-Origin': '*'
      });
      response.send(result);
      response.end();
    });
  });
});

app.post("/api/submitCode", (request, response) => {
  judger.judge(3160103866, request.body.problemID, request.body.code).then((value) => {
    response.set({
      'Access-Control-Allow-Origin': '*'
    });
    response.send(value);
    response.end();
  });
});

app.listen(port, () => {
  console.log("Listening on port " + port + "...");
  console.log("sql-judger API backend is running on http://localhost:" + port);
});
