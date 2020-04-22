const jwt = require('jsonwebtoken')

const newToken = (user) => {

   const payload = {
      userID: user.id,
      username: user.username
   };

   const secret = process.env.SECRET || 'ilikecats';

   const options = {
      expiresIn: 1000*60*5
   };

   return jwt.sign(payload, secret, options)

}

module.exports = newToken;