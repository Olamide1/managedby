// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
const cors = require('cors')
require('dotenv').config()

var db = process.env.MONGODB_URL

fastify.use(cors())
fastify.use(allowCrossDomain)

// Require external modules
const mongoose = require('mongoose')
const routes = require('./routes')
// Connect to DB
mongoose.connect(db)
 .then(() => console.log('MongoDB connected…'))
 .catch(err => console.log(err))
// Declare a route
routes.forEach((route, index) => {
    fastify.route(route)
   })
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})


// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()