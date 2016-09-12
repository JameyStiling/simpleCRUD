const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
  // make public folder accessible to the public by using a built-in middleware called express.static
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  // comments from MongoLab using the find method that’s available in the collection method
  db.collection('comment').find().toArray(function(err, results) {
    // renders in ejs file
    res.render('index.ejs', {
      comment: results
    })
  })
})

app.post('/comment', (req, res) => {
  //create collection of comments
  db.collection('comment').save(req.body, (err, result) => {
    if (err) {
      return console.log(err)
    }
    console.log('saved comment')
    res.redirect('/')
  })
})

app.put('/comment', (req, res) => {
  db.collection('comment').findOneAndUpdate({
      name: 'james'
    }, {
      $set: {
        name: req.body.name,
        quote: req.body.comment
      }
    }, {
      // this sort finds the newest comment from James in database
      sort: {
        _id: -1
      },
      // if no comments found by James still enter in the comment
      upsert: true

    },
    //this callback sends results back to the put request
    (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    }
  )
})

// Start server only when the database is connected
let db;
MongoClient.connect('mongodb://jastiling:crud@ds029446.mlab.com:29446/simplecrud', (err, database) => {
  if (err) {
    return console.log(err)
  }
  db = database;
  //start the server
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})
