const server = require('./api/server.js')
require("dotenv").config();

const port = process.env.PORT || 9000

server.listen(port, () => {
  console.log(`\n** Running on port ${port} **\n`)
})
