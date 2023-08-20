const express = require('express');
const app = express();

const PORT = 8080;
const HOST = '0.0.0.0';

const generateDataPaths = new Set();

app.get('/list', (req, res) => {
  res.json({
    paths: [...generateDataPaths]
  })
});

app.get('*', function (req, res) {
  if (generateDataPaths.has(req.path)) {
    res.json({
      message: `Found url '${req.path}`
    });
  } 
  else {
    res.status(404).json({
      message: `Path '${req.path}' not recognised`
    });
  }
});

app.post("*", (req, res) => {
  const path = req.path;
  if (path === "/list") {
    res.status(400).json({
      message: `URL '${path}' not added`
    });
  } 
  else {
    generateDataPaths.add(req.path);
    res.status(201).json({
      message: `URL '${path}' added`
    });
  }
})

const server = app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});


module.exports = server;