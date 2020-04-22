const express = require('express')
const server = express();
const db = require('../schemes/schemes')
const bcrypt = require('bcryptjs')
const jwt = require('../utils/token')
const auth = require('../utils/auth');

server.use(express.json());

module.exports = server;

server.get('/', (req, res) => {
   res.status(200).json({
      message: `Welcome to the API!`
   })
});

server.post('/signup', (req, res) => {

   const newUser = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10)
   };

   db.addUser(newUser)
      .then(rep => {
         res.status(201).json({
            userID: rep[0]
         })
      })
      .catch(err => {
         res.status(500).json({
            message: `Server error. ${err}`
         })
      });

});

server.post('/login', (req, res) => {

   db.findByUsername(req.body.username)
      .then(user => {
         if (user && bcrypt.compareSync(req.body.password, user[0].password)) {
            res.status(200).json({
               message: `Login success.`,
               token: jwt(user)
            })
         } else {
            res.status(401).json({
               message: `Login failed.`
            })
         }
      })
      .catch(err => {
         res.status(500).json({
            message: `Server error. ${err}`
         })
      });

});

server.get('/users', auth, (req, res) => {

   db.find()
      .then(rep => {
         res.status(200).json({
            data: rep
         });
      })
      .catch(err => {
         res.status(500).json({
            message: `Server error. ${err}`
         })
      });
      
});