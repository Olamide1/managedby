// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
const cors = require('cors')
require('dotenv').config()

var db = process.env.MONGODB_URL

fastify.use(cors())

fastify.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
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