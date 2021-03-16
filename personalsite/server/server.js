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


const PORT = 3001;
app.get('/entries', (req, res) => {
  //var pagenum = req.body.pagenum
  db.query('SELECT * FROM blogposts ORDER BY posttime DESC LIMIT '+(req.query.pagenum*10)+', 10', [], (err, re) => {
    if (err) {
      console.error(err)
      console.log('error1')
      res.send('error querying MySQL')
    } else if (re) {
      console.log('hi')
      db.query('SELECT * FROM blogcomments', [], (e, r) => {
        if (e) {
          console.error(e)
        } else if (r) {
          console.log('error0')
          res.send(JSON.stringify({posts: re, comments: r}))
        }
      
      })

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

app.post('/newcomment', (req, res) => {
  db.query('INSERT INTO blogcomments (usrname, commentcontent,  commenttime, forpost, commtitle) VALUES (?, ?, ?, ?, ?)', [req.body.commuser, req.body.commcontent, req.body.commtime, req.body.forpost, req.body.commtitle], (err, re) => {
    if (err) {
      console.error(err)
      console.log('bad')
      res.send('MySQL insert query failure. It\'s possible your comment was too long')
    } else if (re) {
      console.log('good')
      res.send('Comment successfully submitted')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
