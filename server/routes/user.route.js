var express = require('express')

module.exports = function(UserModel) {
  var router = express.Router()
  router.post('/adduser', function (req, res) {
  // try to initialize the db on every request if it's not already
  var newUser = new UserModel({
    username: req.body.username,
    city: req.body.city,
    password: req.body.password
  })  
  newUser.save((err, user)=>{
    if (err) console.log(err);
    res.redirect('/user')
  })
});
router.get('/', function (req, res) {
  // try to initialize the db on every request if it's not already
 UserModel.find({}, (err, user)=>{
  if (err) console.log(err);

   res.render('user.html',{users:user})
 }) 
});
return router
}