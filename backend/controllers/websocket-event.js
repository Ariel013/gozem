const WebSocket = require('ws')

function sendLocationChangedEvent (wss, deliveryId, location) {
  const locationEvent = {
    event: 'location_changed',
    delivery_id: deliveryId,
    location
  }

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(locationEvent))
    }
  })
}

module.exports = {
  sendLocationChangedEvent
}
