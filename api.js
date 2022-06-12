const request = require('request')
const credentials = require('./credentials.json')

const BASE_URL = 'https://api.myngp.com/v2'

function makeGetRequest(path) {
  const { username, password } = credentials

  return new Promise((resolve, reject) => {
    const options = {
      url: `${BASE_URL}/${path}`,
      auth: {
        user: username,
        password: password
      },
    }
    request.get(`${BASE_URL}/${path}`, options, function (err, req, body) {
      if (err) {
        return reject(err)
      }
      resolve( JSON.parse(body) )
    })
  })
}

async function getBroadcastEmails() {
  return await makeGetRequest('broadcastEmails')
}

async function getBroadcastEmailDetails(id) {
  return await makeGetRequest(`broadcastEmails/${id}?$expand=statistics`)
}

module.exports = {
  getBroadcastEmails,
  getBroadcastEmailDetails,
}