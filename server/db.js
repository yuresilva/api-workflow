const faker = require('faker')
const uuid = require('uuid/v4')

const schemaUsers = {
  id: uuid,
  name: faker.name.findName,
  email: faker.internet.email
}

function generateFakeData (model) {
  let data = {}
  Object.keys(model).forEach(k => {
    data[k] = model[k]()
  })
  return data
}

let generateFakeDatabase = generateFakeData.bind(this, schemaUsers)

module.exports = {
  data: [],
  init: function (users = 10) {
    for (const x of Array(users).keys()) {
      this.data.push(generateFakeDatabase())
    }
    return this
  }
}