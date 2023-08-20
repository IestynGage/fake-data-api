const express = require('express');
const app = express();


const generateDataPaths = new Set();
generateDataPaths.add('/something');
generateDataPaths.add('/something/poo');

app.get('*', function (req, res) {
  if (generateDataPaths.has(req.path)) {
    res.send('Found url ' + req.path);
  }
  res.status(404).send({
    errorMessage: `Not found url '${req.path}'`
  });
});


app.post("*", (req, res) => {
  
})

app.listen(3000);