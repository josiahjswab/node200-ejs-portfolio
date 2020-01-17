const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const request = require('superagent');
require('dotenv').config();

const profile = require('./profile')



const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// http://localhost:8080/profile
app.use('/profile', profile)

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {user: { name: 'John Sheppard'}});
});

app.get('/contact', (req, res) => {

  res.render('contact');
});

const listUniqueId = '3533f30b88';
const mailChimpInstance = 'us4';
const mailChimpApi = process.env.MAIL_CHIMP_API;
// For PostMan:
// https://us4.api.mailchimp.com/3.0/lists/3533f30b88/members/
// In Authorizations set: type = Basic Auth, un: anystring, pw: ab333134890e6208ac5f73be66ccf022

app.post('/send', (req, res) => {
  request
    .post(`https://${mailChimpInstance}.api.mailchimp.com/3.0/lists/${listUniqueId}/members/`)

    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + new Buffer('anystring:' + mailChimpApi ).toString('base64'))
    .send({
      'email_address': req.body.email,
      'status': 'subscribed',
      'merge_fields': {
        'FNAME': req.body.firstName,
        'LNAME': req.body.lastName
      }
    })
    .end(function(err, response) {
      console.log(response.status);
      if (response.status < 300 || (response.status === 400)) {
        res.render('thanks', { contactFormRequest: req.body });

      } else {
        res.render('');
      }
    });
});

app.listen(8080, () => {
  console.log('listening at http://localhost:8080');
});
