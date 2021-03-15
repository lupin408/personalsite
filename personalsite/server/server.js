const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/mysqldb.js')
const mysql = require('mysql');
const path = require('path');
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, '..', 'build')));


const PORT = 80;
app.get('/entries', (req, res) => {
  //var pagenum = req.body.pagenum
  db.query('SELECT * FROM blogposts ORDER BY posttime DESC LIMIT '+(req.query.pagenum*10)+', 10', [], (err, re) => {
    if (err) {
      console.error(err)
      res.send('error querying MySQL')
    } else if (re) {
res.send(JSON.stringify(re))
    }
  } )
   
  });

app.post('/newpost', (req, res) => {
  db.query('INSERT INTO blogposts (postuser, posttitle, posttime, postcontent) VALUES (?, ?, ?, ?)', [req.body.postuser, req.body.posttitle, req.body.posttime, req.body.postcontent], (err, re) => {
    if (err) {
      console.error(err);
      res.send('error submitting post')
    } else if (re) {
      res.send('Successfully submitted')
    }
  })
})



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
