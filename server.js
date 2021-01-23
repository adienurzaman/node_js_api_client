const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = require("hbs");
const { get } = require('request');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const viewsDir = path.join(__dirname, 'views');
app.set("views", viewsDir);

// set view engine
app.engine("hbs", exphbs({
  layoutsDir: viewsDir + '/layout',
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set("view engine", "hbs");

app.get('/', (req, res) => res.redirect('/user'))
app.get('/user', (req, res) => {
  res.render('user', {
    data: {
      title: "GET DATA API"
    }
  });
});

app.listen(3000, () => console.log('Listening on port 3000!'));

function request(url, returnBuffer = true, timeout = 10000) {
  return new Promise(function (resolve, reject) {
    const options = Object.assign(
      {},
      {
        url,
        isBuffer: true,
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
      },
      returnBuffer ? { encoding: null } : {}
    )

    get(options, function (err, res) {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}