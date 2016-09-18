var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var DESIGNS_FILE = path.join(__dirname, 'data/design.json');
var PERSON_FILE = path.join(__dirname, 'data/person.json');
var REVIEW_FILE = path.join(__dirname, 'data/review.json');
var TRANSACTION_FILE = path.join(__dirname, 'data/transaction.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// GET Designs
app.get('/api/design', function(req, res) {
  fs.readFile(DESIGNS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// GET Designs BY DID
app.get('/api/design/:id', function(req, res) {
  fs.readFile(DESIGNS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var result = JSON.parse(data);
    for (var i = result.length - 1; i >= 0; i--) {
      if (result[i].did === req.params.id) {
        res.json(result[i]);
      }
    };
  });
});

// PUT Design Materials BY MID
app.put('/api/design/:id', function(req, res) {
  fs.readFile(DESIGNS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var result = JSON.parse(data);

    for (var i = result.length - 1; i >= 0; i--) 
    {
      if (result[i].did === req.params.id) 
      {
        for (var j = result[i].materials.length - 1; j >= 0; j--) 
        {
          for (var x = req.body.joinedMaterialsAndMids.length - 1; x >= 0; x--) {
            if (result[i].materials[j].mid === req.body.joinedMaterialsAndMids[x].mid) 
            {
              result[i].materials[j].name = req.body.joinedMaterialsAndMids[x].material;
            }
          };   
        };
      }
    };
    fs.writeFile(DESIGNS_FILE, JSON.stringify(result, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(result);
    });
  });
});

// GET Person BY PID
app.get('/api/person/:id', function(req, res) {
  fs.readFile(PERSON_FILE, function(err, data) {
    var result = JSON.parse(data);
    for (var i = result.length - 1; i >= 0; i--) {
      if (result[i].pid === req.params.id) {
        res.json(result[i]);
      }
    };
  });
});

// GET PERSON JSON FILE CONTENTS
app.get('/api/person', function(req, res) {
  fs.readFile(PERSON_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    
    res.json(JSON.parse(data));
  });
});

// GET REVIEW JSON FILE CONTENTS
app.get('/api/review', function(req, res) {
  fs.readFile(REVIEW_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// GET Reviews BY PID
app.get('/api/personReviews/:id', function(req, res) {
  fs.readFile(REVIEW_FILE, function(err, data) {
    var result = JSON.parse(data)
    var reviews = [];
    for (var i = result.length - 1; i >= 0; i--) {
      if (result[i].pid === req.params.id) {
        reviews.push(result[i]);
      }
    };
    res.json(reviews);
  });
});

// GET TRANSACTION JSON FILE CONTENTS
app.get('/api/transaction', function(req, res) {
  fs.readFile(TRANSACTION_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// GET Transactions BY PID
app.get('/api/personTransactions/:id', function(req, res) {
  fs.readFile(TRANSACTION_FILE, function(err, data) {
    var result = JSON.parse(data);
    var transactions = [];
    for (var i = result.length - 1; i >= 0; i--) {
      if (result[i].pid === req.params.id) {
        transactions.push(result[i]);
      }
    };
    res.json(transactions);
  });
});

app.post('/api/transaction', function(req, res) {
  fs.readFile(TRANSACTION_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var transactions = JSON.parse(data);
    console.log(transactions);
    var newTransaction = {
      tid: Date.now(),
      pid: req.body.pid,
      did: req.body.did,
      msg: req.body.msg,
      rate: req.body.rate,
      status: "pending",
    };
    transactions.push(newTransaction);
    fs.writeFile(TRANSACTION_FILE, JSON.stringify(transactions, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(transactions);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
