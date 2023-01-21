var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const uploadFile = multer({dest: 'uploads/'});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', uploadFile.single('upfile'), async function(req, res)
{
  try{
    res.json(
      {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
      });
  }
  catch(error)
  {
    console.log(`There was an error: ${error}`);
    res.status(400).json({msg: 'error'});
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
