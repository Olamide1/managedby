// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})
const cors = require('cors')

fastify.use(cors())
// Require external modules
const mongoose = require('mongoose')
const routes = require('./routes')
// Connect to DB
mongoose.connect('mongodb://localhost/managedby')
 .then(() => console.log('MongoDB connected…'))
 .catch(err => console.log(err))
// Declare a route
routes.forEach((route, index) => {
    fastify.route(route)
   })
fastify.get('/', async (request, reply) => {
  reply.sent = true
  return { hello: 'world' }
})


// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()