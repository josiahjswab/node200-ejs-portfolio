const express = require('express');
const router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// http://localhost:8080/profile
// router.get('/', function(req, res) {
//   res.send('Hello World')
// })
router.route('/')
  .get(function (req, res) {
    res.send('Welcome to profile.')
  })
  .get(function (req, res) {
    // code to be executed upon this route request.
    res.send()
  })
  .get(function (req, res) {
    // code to be executed upon this route request.
    res.send()
  })
  .get(function (req, res) {
    // code to be executed upon this route request.
    res.send()
  })
  .get(function (req, res) {
    // code to be executed upon this route request.
    res.send()
  })
  
// http://localhost:8080/profile/about
router.get('/about', function(req, res) {
  res.send('About me ')
})

module.exports = router
