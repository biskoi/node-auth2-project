const server = require('./src/server')
const port = process.env.PORT || 4001;

server.listen(port, () => {
   console.log(`Server running on port ${port}`)
})
