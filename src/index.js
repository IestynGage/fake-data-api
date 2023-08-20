const express = require('express');
const app = express();

const generateDataPaths = new Set();
generateDataPaths.add('/something');
generateDataPaths.add('/something/poo');

app.get('*', function (req, res) {
  if (generateDataPaths.has(req.path)) {
    res.json({
      message: 'Found url ' + req.path
    });
  } 
  else {
    res.status(404).json({
      message: `Path '${req.path}' not recognised`
    });
  }
});

app.post("*", (req, res) => {
  generateDataPaths.add(req.path);
  res.json({
    message: 'url added'
  })
})

app.listen(3000);