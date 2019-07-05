const Fastify = require('fastify')
const fastify = Fastify()

const db = require('./db').init()
const { remove } = require('lodash')

fastify.register(require('fastify-cors'))

fastify.get('/', function (request, reply) {
  reply.send(db.data)
})

fastify.get('/:id', function (request, reply) {
  reply.send(db.data.find(i => i.id === request.params.id))
})

const schemaPost = { 
  body: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string' }
    },
    required: ['id', 'name', 'email']
  }
}

fastify.post('/', { schema: schemaPost }, function (request, reply) {
  const { id, name, email } = request.body
  db.data.push({ id, name, email })

  res.status(201).send({ success: true })
})

fastify.delete('/:id', function (request, reply) {
  db.data = remove(db.data, n => n.id == request.params.id)
  
  res.status(202).send({ success: true })
})

fastify.listen(3000, (err, address) => {
  if (err) throw err
  console.log('Server running at:', address)
})

