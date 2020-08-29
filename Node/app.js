const axios = require("axios");
var cors = require("cors");

const express = require("express");
var async = require("express-async-await");
var fetch = require("node-fetch");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3004;

app.get("/guardian", (req, res) => {
  fetch(
    "https://content.guardianapis.com/search?api-key=API-KEY&section=(sport|business|technology|politics)&show-blocks=all"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.response.results;
      res.send(gdata);
    });
});

app.get("/nyt", (req, res) => {
  fetch(
    "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=API-KEY"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.results;
      res.send(gdata);
    });
});

app.get("/guardianw", (req, res) => {
  fetch(
    "https://content.guardianapis.com/world?api-key=API-KEY&show-blocks=all"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.response.results;
      res.send(gdata);
    });
});

app.get("/nytw", (req, res) => {
  fetch(
    "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=API-KEY"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.results;

      res.send(gdata);
    });
});

app.get("/guardianp", (req, res) => {
  fetch(
    "https://content.guardianapis.com/politics?api-key=API-KEY&show-blocks=all"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.response.results;

      res.send(gdata);
    });
});

app.get("/nytp", (req, res) => {
  fetch(
    "https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=API-KEY"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.results;

      res.send(gdata);
    });
});

app.get("/guardiant", (req, res) => {
  fetch(
    "https://content.guardianapis.com/technology?api-key=API-KEY&show-blocks=all"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.response.results;

      res.send(gdata);
    });
});

app.get("/nytt", (req, res) => {
  fetch(
    "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=API-KEY"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.results;

      res.send(gdata);
    });
});

app.get("/guardianb", (req, res) => {
  fetch(
    "https://content.guardianapis.com/business?api-key=API-KEY&show-blocks=all"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.response.results;

      res.send(gdata);
    });
});

app.get("/nytb", (req, res) => {
  fetch(
    "https://api.nytimes.com/svc/topstories/v2/business.json?api-key=API-KEY"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.results;

      res.send(gdata);
    });
});

app.get("/guardians", (req, res) => {
  fetch(
    "https://content.guardianapis.com/sport?api-key=API-KEY&show-blocks=all"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.response.results;

      res.send(gdata);
    });
});

app.get("/nyts", (req, res) => {
  fetch(
    "https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=API-KEY"
  )
    .then(res => res.json())
    .then(data => {
      var gdata = data.results;

      res.send(gdata);
    });
});

var kdata;
app.get("/create", function(req, res) {
  var url = req.query.id;
  var urll =
    "https://content.guardianapis.com/" +
    url +
    "?api-key=API-KEY&show-blocks=all";
  fetch(urll)
    .then(res => res.json())
    .then(data => {
      kdata = data.response.content;
      //console.log(kdata)
      res.send(kdata);
      //console.log(typeof(gdata))
    });
});

app.get("/query", function(req, res) {
  res.send(kdata);
});

var kdata2,
  kk = [];
app.get("/create1", function(req, res) {
  var url = req.query.id;
  var urll =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=API-KEY&fq=web_url:("' +
    url +
    '")';
  try
 { fetch(urll)
    .then(res => res.json())
    .then(data => {
      kdata2 = data.response.docs;

      res.send(kdata2);
    });}
    catch(e) {
        console.log('Error caught');
      }
   
});

app.get("/query1", function(req, res) {
  res.send(kdata2);
});

app.get("/searchq", function(req, res) {
  const alldata = [];
  var term = req.query.id;
  //console.log(req.query.id)

  var url =
    "https://content.guardianapis.com/search?q=" +
    term +
    "&api-key=API-KEY";
  var url2 =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    term +
    "&api-key=API-KEY";
  const urls = [url, url2];
  try
  {Promise.all(urls.map(url => fetch(url).then(res => res.json()))).then(
    data => {
      const queryword = data[0].response.results;
      const queryword2 = data[1].response.docs;
      res.send({ guardian: queryword, nyt: queryword2 });
    }
  );}
  catch(e) {
    console.log('Error caught');
  }
  

});

app.get("/searchqresult", function(req, res) {
  res.send(queryword);
});
app.get("/searchqresult2", function(req, res) {
  res.send(queryword2);
});

app.listen(PORT, () => console.log(`${PORT}`));
