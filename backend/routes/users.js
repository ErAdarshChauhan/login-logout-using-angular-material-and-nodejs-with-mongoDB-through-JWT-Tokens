var express = require('express');
var router = express.Router();
var Employee = require('../model/employee');
var jwt = require('jsonwebtoken');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// API to register employee
router.post('/register', function(req,res,next){
  console.log(req.body);
  var employee = new Employee({
    username : req.body.username,
    password : Employee.hashPassword(req.body.password),
    email : req.body.email,
    creation_dt: Date.now()
  });

  let promise = employee.save();

  promise.then(function(doc){
    return res.status(201).json(doc);
  });

  promise.catch(function(err){
    return res.status(501).json({message:'Error occured while registering Employee.'});
  });
});

//API to Login 
router.post('/login', function(req,res,next){
  console.log(req.body.email+'  '+req.body.password);
  let promise = Employee.findOne({email:req.body.email}).exec();

  promise.then(function(doc){
    if(doc){
      //validate password.
      if(doc.isValid(req.body.password)){
          //generate token
          let token = jwt.sign({username:doc.username},'secret',{expiresIn:'1h'});
          return res.status(200).json(token);
      }
      else{
        res.status(501).json({message:'Invalid Credentials..'});
      }
    }
    else{
      res.status(501).json({message:'User with this Email is not Registered.'});
    }
  });

  promise.catch(function(err){
    res.status(501).json({message:'Some internal error.'});
  });
});

//API to verify user through tokens
//             ----------- start ------------
router.get('/username',verifyToken, function(req,res,next){
  return res.status(200).json(decodedToken.username);
});

//middleware function that verify the user
var decodedToken = '';

function verifyToken(req,res,next){
  //get token from query string from the request
  let token = req.query.token;
  //verify token through JWT
  jwt.verify(token,'secret',function(err,tokendata){
      if(err){
        return res.status(400).json({message:'Un - Authorized Request.'});
      }
      if(tokendata){
          decodedToken = tokendata;
          next();
      }
   })
}
//             ----------- End ------------
module.exports = router;
